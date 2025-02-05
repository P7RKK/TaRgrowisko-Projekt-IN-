from surprise import SVD, Dataset, Reader
import pandas as pd

// Dane ocen użytkowników dla gier
ratings = pd.DataFrame({
    'user_id': [1, 2, 1, 3],
    'game_id': [1, 2, 3, 1],
    'rating': [5, 4, 3, 4]
})

// Przygotowanie danych
reader = Reader(rating_scale=(1, 5))
data = Dataset.load_from_df(ratings[['user_id', 'game_id', 'rating']], reader)
trainset = data.build_full_trainset()

// Trenowanie modelu
model = SVD()
model.fit(trainset)

// Predykcja oceny
predicted_rating = model.predict(1, 2)  # Ocena użytkownika 1 dla gry 2
print(f"Przewidywana ocena użytkownika 1 dla gry 2: {predicted_rating.est}")