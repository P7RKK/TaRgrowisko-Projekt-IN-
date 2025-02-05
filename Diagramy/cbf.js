import TfidfVectorizer from sklearn.feature_extraction.text;
import cosine_similarity from sklearn.metrics.pairwise;
import pandas as pd;

// Przykładowe dane gier
games = pd.DataFrame({
    'game_id': [1, 2, 3],
    'description': [
        "Gra akcji z otwartym światem i zaawansowaną grafiką",
        "Strategia turowa z elementami RPG",
        "Symulator wyścigów z realistycznym modelem jazdy"
    ]
})

// Wektoryzacja opisu gier
vectorizer = TfidfVectorizer()
tfidf_matrix = vectorizer.fit_transform(games['description'])

// Obliczanie podobieństwa
similarity_matrix = cosine_similarity(tfidf_matrix)

// Wyświetlenie podobieństw
print("Macierz podobieństwa:")
print(similarity_matrix)