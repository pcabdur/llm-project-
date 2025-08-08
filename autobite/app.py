from fastapi import FastAPI
from pydantic import BaseModel
import pandas as pd
import joblib
import os

MODEL_DIR = r"E:\LLm\project\autobite-ai\models"
DATA_DIR = r"E:\LLm\project\autobite-ai\data"

intent_model = joblib.load(os.path.join(MODEL_DIR, "intent_pipeline.joblib"))
knn_model = joblib.load(os.path.join(MODEL_DIR, "recommender_knn.pkl"))
user_profiles = joblib.load(os.path.join(MODEL_DIR, "user_profiles.pkl"))

products_df = pd.read_csv(os.path.join(DATA_DIR, "products.csv"))
food_prefs_df = pd.read_csv(os.path.join(DATA_DIR, "food_preferences.csv"))

app = FastAPI()

class PredictRequest(BaseModel):
    text: str
    user_id: int
    dislikes: list = []  # e.g., ["sweet"]

@app.post("/predict_text")
def predict_text(req: PredictRequest):
    # Predict intent
    intent = intent_model.predict([req.text])[0]

    if req.user_id not in user_profiles.index:
        return {"error": f"User {req.user_id} not found"}

    # Find similar users by kNN
    distances, indices = knn_model.kneighbors(user_profiles.loc[[req.user_id]], n_neighbors=6)
    similar_users = user_profiles.iloc[indices[0]].index.tolist()

    # Aggregate preference scores from similar users
    recs = food_prefs_df[food_prefs_df['user_id'].isin(similar_users)]
    recs = recs.groupby("product_id")["preference_score"].mean().reset_index()
    recs = recs.merge(products_df, on="product_id")

    # Filter disliked categories
    if req.dislikes:
        recs = recs[~recs["category"].isin(req.dislikes)]

    # Fallback to disliked category items if few recommendations
    if len(recs) < 5 and req.dislikes:
        fallback = products_df[products_df["category"].isin(req.dislikes)].sample(
            min(5 - len(recs), len(products_df)), random_state=42)
        recs = pd.concat([recs, fallback])

    recs = recs.sort_values("preference_score", ascending=False).head(5)

    recommendations = recs[["food_item", "category", "price", "preference_score"]].to_dict(orient="records")

    return {
        "intent": intent,
        "recommendations": recommendations
    }
