import torch
import pandas as pd
import psycopg2

# Подключение к PostgreSQL
conn = psycopg2.connect(
    dbname="test_app",
    user="postgres",
    password="4256135",
    host="localhost",
    port="5432"
)

# Читаем таблицу пользователей
df = pd.read_sql("SELECT * FROM \"Users\"", conn)
conn.close()

print("📊 Users Data:")
print(df)

# Простая статистика: количество пользователей
num_users = len(df)
print(f"\nКоличество пользователей: {num_users}")

# Пример PyTorch: создаём тензор из длин имён
name_lengths = torch.tensor(df['name'].apply(len).values, dtype=torch.float32)
mean_length = torch.mean(name_lengths)
print(f"Средняя длина имени: {mean_length.item():.2f}")