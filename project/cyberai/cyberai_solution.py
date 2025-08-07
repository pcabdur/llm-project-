import pandas as pd
import numpy as np
import networkx as nx
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.model_selection import cross_val_score, StratifiedKFold
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.metrics import classification_report, accuracy_score, f1_score
import xgboost as xgb
from collections import Counter
import warnings
warnings.filterwarnings('ignore')

class GraphFeatureExtractor:
    """Extract comprehensive features from Function Call Graphs"""
    
    def __init__(self):
        self.feature_names = []
    
    def extract_basic_features(self, graph):
        """Extract basic graph topology features"""
        features = {}
        
        # Basic counts
        features['num_nodes'] = graph.number_of_nodes()
        features['num_edges'] = graph.number_of_edges()
        features['density'] = nx.density(graph) if graph.number_of_nodes() > 1 else 0
        
        # Degree statistics
        degrees = [d for n, d in graph.degree()]
        if degrees:
            features['avg_degree'] = np.mean(degrees)
            features['max_degree'] = np.max(degrees)
            features['min_degree'] = np.min(degrees)
            features['degree_std'] = np.std(degrees)
        else:
            features['avg_degree'] = features['max_degree'] = 0
            features['min_degree'] = features['degree_std'] = 0
        
        # In/Out degree for directed graphs
        if graph.is_directed():
            in_degrees = [d for n, d in graph.in_degree()]
            out_degrees = [d for n, d in graph.out_degree()]
            
            features['avg_in_degree'] = np.mean(in_degrees) if in_degrees else 0
            features['avg_out_degree'] = np.mean(out_degrees) if out_degrees else 0
            features['max_in_degree'] = np.max(in_degrees) if in_degrees else 0
            features['max_out_degree'] = np.max(out_degrees) if out_degrees else 0
        
        return features
    
    def extract_centrality_features(self, graph):
        """Extract centrality-based features"""
        features = {}
        
        if graph.number_of_nodes() == 0:
            return {f'centrality_{metric}': 0 for metric in ['betweenness', 'closeness', 'eigenvector', 'pagerank']}
        
        try:
            # Betweenness centrality
            betweenness = nx.betweenness_centrality(graph)
            features['centrality_betweenness'] = np.mean(list(betweenness.values()))
            
            # Closeness centrality
            if nx.is_connected(graph.to_undirected()):
                closeness = nx.closeness_centrality(graph)
                features['centrality_closeness'] = np.mean(list(closeness.values()))
            else:
                features['centrality_closeness'] = 0
            
            # Eigenvector centrality
            try:
                eigenvector = nx.eigenvector_centrality(graph, max_iter=1000)
                features['centrality_eigenvector'] = np.mean(list(eigenvector.values()))
            except:
                features['centrality_eigenvector'] = 0
            
            # PageRank
            pagerank = nx.pagerank(graph)
            features['centrality_pagerank'] = np.mean(list(pagerank.values()))
            
        except Exception as e:
            features = {f'centrality_{metric}': 0 for metric in ['betweenness', 'closeness', 'eigenvector', 'pagerank']}
        
        return features
    
    def extract_structural_features(self, graph):
        """Extract structural properties"""
        features = {}
        
        # Clustering coefficient
        try:
            features['clustering_coefficient'] = nx.average_clustering(graph)
        except:
            features['clustering_coefficient'] = 0
        
        # Connected components
        if graph.is_directed():
            features['num_weakly_connected'] = nx.number_weakly_connected_components(graph)
            features['num_strongly_connected'] = nx.number_strongly_connected_components(graph)
        else:
            features['num_connected_components'] = nx.number_connected_components(graph)
            features['num_weakly_connected'] = features['num_connected_components']
            features['num_strongly_connected'] = features['num_connected_components']
        
        # Diameter and radius (for connected graphs)
        try:
            if nx.is_connected(graph.to_undirected()):
                features['diameter'] = nx.diameter(graph.to_undirected())
                features['radius'] = nx.radius(graph.to_undirected())
            else:
                features['diameter'] = features['radius'] = 0
        except:
            features['diameter'] = features['radius'] = 0
        
        # Triadic census (for directed graphs)
        if graph.is_directed() and graph.number_of_nodes() > 2:
            try:
                triadic = nx.triadic_census(graph)
                features['triadic_transitivity'] = sum([triadic[key] for key in triadic if '3' in key])
            except:
                features['triadic_transitivity'] = 0
        else:
            features['triadic_transitivity'] = 0
        
        return features
    
    def extract_all_features(self, graph):
        """Extract all features from a graph"""
        features = {}
        
        # Combine all feature types
        features.update(self.extract_basic_features(graph))
        features.update(self.extract_centrality_features(graph))
        features.update(self.extract_structural_features(graph))
        
        return features

class CyberAIClassifier:
    """Complete solution for CyberAI Cup 2025 Task 2"""
    
    def __init__(self):
        self.feature_extractor = GraphFeatureExtractor()
        self.scaler = StandardScaler()
        self.label_encoder = LabelEncoder()
        self.models = {}
        self.feature_names = []
    
    def parse_graph_data(self, file_path):
        """Parse the graph data file and create NetworkX graphs"""
        graphs = []
        current_graph_edges = []
        graph_count = 0
        
        print(f"📁 Reading file: {file_path}")
        
        with open(file_path, 'r') as f:
            lines = f.readlines()
        
        print(f"📄 Total lines in file: {len(lines)}")
        
        for i, line in enumerate(lines):
            line = line.strip()
            
            # Skip empty lines
            if not line:
                continue
            
            # Check for graph separator (could be different formats)
            if (line.startswith('#') or 
                line.startswith('graph') or 
                line.startswith('Graph') or
                line.startswith('t #') or  # Common format: "t # 0"
                line.startswith('% ')):   # Another common format
                
                # Save previous graph if it has edges
                if current_graph_edges:
                    G = nx.DiGraph()
                    for edge in current_graph_edges:
                        G.add_edge(edge[0], edge[1])
                    graphs.append(G)
                    graph_count += 1
                    if graph_count % 100 == 0:
                        print(f"  Parsed {graph_count} graphs...")
                    current_graph_edges = []
                continue
            
            # Try to parse edge in different formats
            try:
                # Format 1: "node1 node2"
                if ' ' in line and not line.startswith('v ') and not line.startswith('e '):
                    parts = line.split()
                    if len(parts) >= 2 and parts[0].isdigit() and parts[1].isdigit():
                        current_graph_edges.append((parts[0], parts[1]))
                
                # Format 2: "e node1 node2" (edge format)
                elif line.startswith('e '):
                    parts = line.split()
                    if len(parts) >= 3:
                        current_graph_edges.append((parts[1], parts[2]))
                
                # Format 3: "node1->node2" or "node1 -> node2"
                elif '->' in line:
                    parts = line.replace('->', ' ').split()
                    if len(parts) >= 2:
                        current_graph_edges.append((parts[0], parts[1]))
                
                # Format 4: Try comma or tab separated
                elif ',' in line or '\t' in line:
                    parts = line.replace(',', ' ').replace('\t', ' ').split()
                    if len(parts) >= 2:
                        current_graph_edges.append((parts[0], parts[1]))
            
            except Exception as e:
                # Skip problematic lines
                continue
        
        # Add the last graph
        if current_graph_edges:
            G = nx.DiGraph()
            for edge in current_graph_edges:
                G.add_edge(edge[0], edge[1])
            graphs.append(G)
            graph_count += 1
        
        print(f"✅ Parsed {len(graphs)} graphs from {len(lines)} lines")
        
        # If we still only have 1 graph, try different parsing approach
        if len(graphs) == 1 and len(lines) > 100:
            print("🔧 Trying alternative parsing method...")
            graphs = self.parse_graph_data_alternative(file_path)
        
        return graphs
    
    def parse_graph_data_alternative(self, file_path):
        """Alternative parsing method for different file formats"""
        graphs = []
        
        with open(file_path, 'r') as f:
            content = f.read()
        
        # Try splitting by double newlines or other patterns
        potential_graphs = content.split('\n\n')
        if len(potential_graphs) == 1:
            potential_graphs = content.split('---')
        if len(potential_graphs) == 1:
            # Try splitting every N lines (common in some formats)
            lines = content.strip().split('\n')
            chunk_size = max(1, len(lines) // 1397)  # Assuming 1397 graphs
            potential_graphs = ['\n'.join(lines[i:i+chunk_size]) 
                              for i in range(0, len(lines), chunk_size)]
        
        print(f"🔍 Found {len(potential_graphs)} potential graph sections")
        
        for graph_text in potential_graphs:
            lines = graph_text.strip().split('\n')
            edges = []
            
            for line in lines:
                line = line.strip()
                if not line or line.startswith('#'):
                    continue
                
                # Try to extract edges
                parts = line.replace('->', ' ').replace(',', ' ').split()
                if len(parts) >= 2:
                    try:
                        edges.append((parts[0], parts[1]))
                    except:
                        continue
            
            if edges:
                G = nx.DiGraph()
                for edge in edges:
                    G.add_edge(edge[0], edge[1])
                graphs.append(G)
        
        print(f"✅ Alternative method parsed {len(graphs)} graphs")
        return graphs
    
    def load_labels(self, label_file_path):
        """Load training labels"""
        print(f"📋 Loading labels from: {label_file_path}")
        
        with open(label_file_path, 'r') as f:
            labels = [line.strip() for line in f.readlines()]
        
        print(f"✅ Loaded {len(labels)} labels")
        print(f"📊 Label distribution: {Counter(labels)}")
        return labels
    
    def extract_features_from_graphs(self, graphs):
        """Extract features from list of graphs"""
        print(f"🔧 Extracting features from {len(graphs)} graphs...")
        
        feature_list = []
        for i, graph in enumerate(graphs):
            if i % 100 == 0:
                print(f"  Processing graph {i+1}/{len(graphs)}")
            
            features = self.feature_extractor.extract_all_features(graph)
            feature_list.append(features)
        
        # Convert to DataFrame
        df = pd.DataFrame(feature_list)
        
        # Handle missing values
        df = df.fillna(0)
        
        # Store feature names
        self.feature_names = df.columns.tolist()
        
        print(f"✅ Extracted {df.shape[1]} features")
        return df
    
    def train_models(self, X_train, y_train):
        """Train multiple models and create ensemble"""
        print("🤖 Training models...")
        
        # Encode labels
        y_encoded = self.label_encoder.fit_transform(y_train)
        
        # Scale features
        X_scaled = self.scaler.fit_transform(X_train)
        
        # Define models
        models = {
            'random_forest': RandomForestClassifier(n_estimators=200, random_state=42, n_jobs=-1),
            'gradient_boosting': GradientBoostingClassifier(n_estimators=200, random_state=42),
            'xgboost': xgb.XGBClassifier(n_estimators=200, random_state=42, eval_metric='mlogloss')
        }
        
        # Train and evaluate each model
        cv_scores = {}
        for name, model in models.items():
            print(f"  Training {name}...")
            
            # Cross-validation (adjust splits based on sample size)
            n_splits = min(5, len(y_encoded))
            if n_splits < 2:
                print(f"    ⚠️ Too few samples for CV, using simple train-test")
                model.fit(X_scaled, y_encoded)
                cv_scores[name] = 1.0  # Placeholder score
            else:
                cv_score = cross_val_score(model, X_scaled, y_encoded, 
                                         cv=StratifiedKFold(n_splits=n_splits, shuffle=True, random_state=42),
                                         scoring='f1_macro', n_jobs=-1)
                cv_scores[name] = cv_score.mean()
                
                # Train on full data
                model.fit(X_scaled, y_encoded)
                print(f"    ✅ {name}: CV F1 = {cv_score.mean():.4f} ± {cv_score.std():.4f}")
            
            self.models[name] = model
        
        # Find best model
        best_model_name = max(cv_scores, key=cv_scores.get)
        print(f"🏆 Best model: {best_model_name} (F1: {cv_scores[best_model_name]:.4f})")
        
        return cv_scores
    
    def predict(self, X_test):
        """Make predictions using ensemble of models"""
        print("🔮 Making predictions...")
        
        X_scaled = self.scaler.transform(X_test)
        
        # Get predictions from all models
        predictions = {}
        for name, model in self.models.items():
            pred_proba = model.predict_proba(X_scaled)
            predictions[name] = pred_proba
        
        # Ensemble: average probabilities
        ensemble_proba = np.mean(list(predictions.values()), axis=0)
        ensemble_pred = np.argmax(ensemble_proba, axis=1)
        
        # Decode labels
        final_predictions = self.label_encoder.inverse_transform(ensemble_pred)
        
        return final_predictions
    
    def save_submission(self, predictions, output_file='submission.txt'):
        """Save predictions in the required format"""
        print(f"💾 Saving predictions to {output_file}")
        
        with open(output_file, 'w') as f:
            for pred in predictions:
                f.write(f"{pred}\n")
        
        print(f"✅ Saved {len(predictions)} predictions")

def main():
    """Main execution function"""
    print("🚀 CyberAI Cup 2025 - Task 2: IoT Malware Classification")
    print("=" * 60)
    
    # File paths
    train_data_path = r"E:\LLm\project\cyberai\task-2\CyberAI2025_train.data"
    test_data_path = r"E:\LLm\project\cyberai\task-2\CyberAI2025_test.data"
    train_label_path = r"E:\LLm\project\cyberai\task-2\CyberAI2025_train.label"
    
    # Initialize classifier
    classifier = CyberAIClassifier()
    
    try:
        # Load and parse training data
        print("\n📚 STEP 1: Loading Training Data")
        train_graphs = classifier.parse_graph_data(train_data_path)
        train_labels = classifier.load_labels(train_label_path)
        
        # Verify data consistency
        if len(train_graphs) != len(train_labels):
            print(f"⚠️  Warning: {len(train_graphs)} graphs but {len(train_labels)} labels")
            min_len = min(len(train_graphs), len(train_labels))
            train_graphs = train_graphs[:min_len]
            train_labels = train_labels[:min_len]
        
        # Extract features from training data
        print("\n🔧 STEP 2: Feature Extraction")
        X_train = classifier.extract_features_from_graphs(train_graphs)
        print(f"📊 Training features shape: {X_train.shape}")
        
        # Train models
        print("\n🤖 STEP 3: Model Training")
        cv_scores = classifier.train_models(X_train, train_labels)
        
        # Load and process test data
        print("\n📋 STEP 4: Processing Test Data")
        test_graphs = classifier.parse_graph_data(test_data_path)
        X_test = classifier.extract_features_from_graphs(test_graphs)
        print(f"📊 Test features shape: {X_test.shape}")
        
        # Make predictions
        print("\n🔮 STEP 5: Making Predictions")
        predictions = classifier.predict(X_test)
        
        # Save submission
        print("\n💾 STEP 6: Saving Results")
        classifier.save_submission(predictions, 'cyberai_task2_submission.txt')
        
        # Summary
        print("\n🎉 EXECUTION COMPLETE!")
        print("=" * 60)
        print(f"📁 Processed {len(train_graphs)} training samples")
        print(f"📁 Processed {len(test_graphs)} test samples") 
        print(f"🔧 Extracted {X_train.shape[1]} features per sample")
        print(f"🤖 Trained {len(classifier.models)} models")
        print(f"💾 Generated predictions: cyberai_task2_submission.txt")
        print("\n🏆 Ready for submission to CyberAI Cup 2025!")
        
    except Exception as e:
        print(f"❌ Error occurred: {str(e)}")
        print("🔧 Debugging tips:")
        print("1. Check if all file paths are correct")
        print("2. Verify file formats match expected structure")
        print("3. Ensure sufficient memory for large datasets")
        return False
    
    return True

if __name__ == "__main__":
    success = main()
    if success:
        print("\n✅ Program completed successfully!")
    else:
        print("\n❌ Program encountered errors. Check the output above.")