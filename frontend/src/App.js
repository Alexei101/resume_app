import React, { useState } from "react";
import "./App.css";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("https://resumeapp-stage.up.railway.app/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, contact, message }),
    })
      .then((res) => {
        if (res.ok) {
          setName("");
          setContact("");
          setMessage("");
          setSubmitted(true);
          setTimeout(() => setSubmitted(false), 3000);
          setShowForm(false);
        }
      })
      .catch(console.error);
  };

  return (
    <div className="App">
      <aside className="sidebar">
        <img
          src="/profile_photo.jpeg"
          alt="Alexey Lebedev"
          className="photo"
        />
        <h2>Лебедев Алексей</h2>
        <p>BI-аналитик</p>
        <p>+7 (950)-755-91-67</p>
        <p>Telegram: @AlexeyR6</p>
        <p>alexeyr101@gmail.com</p>
        <p>Серпухов, МО</p>
        <hr />
        <p>Форма, если захотите связаться со мной тут)</p>
        <button onClick={() => setShowForm(true)}>Открыть форму</button>
      </aside>

      <main className="main">
        {/* Желаемая должность */}
        <section>
          <h2>🎯 Желаемая должность</h2>
          <p>BI-аналитик, аналитик данных, системный аналитик</p>
          <p>Специализации: Аналитик</p>
          <p>Занятость: полная, частичная, проектная работа, стажировка</p>
          <p>График работы: полный день, гибкий график, удалённая работа или гибрид</p>
        </section>

        {/* Опыт работы */}
        <section>
          <h2>💼 Опыт работы</h2>
          <h3>Центр корпоративных решений — Специалист</h3>
          <p>Октябрь 2023 — настоящее время</p>
          <ul>
            <li>Работа с PostgreSQL, обработка "сырых" данных и создание витрин для кубов.</li>
            <li>Создание справочников, кубов данных, отчетов и небольших модулей в Форсайт АП.</li>
            <li>Создание,настройка и поддержка ETL-задач, алгоритмов расчета, постановка на регламентное обновление.</li>
            <li>Участие в проектах: 
            <p>Автоматизация и создание отчетности HR по показателям SLA/OLA/KPI,</p>
            <p>Отчет аудита действий пользователей(статистика использования отчетности),</p>
            <p>Реализация отчетности по качеству,</p>
            <p>Реализация отчета по отслеживанию утилизации лицензий.</p>
            </li>
            <li>Взаимодействие с бизнес-заказчиками, коллегами из других подразделений и работа с документацией.</li>
            <li>Работа по методологии Scrum.</li>
          </ul>

          <h3>Центр корпоративных решений — Стажер специалиста</h3>
          <p>Июль 2023 — Октябрь 2023</p>
          <ul>
            <li>Подготовка данных и составление отчетов/дашбордов в Форсайт</li>
            <li>Реализация табличных справочников и OLAP-кубов</li>
          </ul>
        </section>

        {/* Образование */}
        <section>
          <h2>🎓 Образование</h2>
          <p>Бакалавр, Воронежский государственный университет, ФКН, 2023</p>
          <p>Специальность: Информационные системы в телекоммуникациях</p>
        </section>

        {/* Повышение квалификации */}
        <section>
          <h2>📚 Курсы и повышение квалификации</h2>
          <p>Java Backend Developer, JetBrains Academy, 2023</p>
        </section>

        {/* Навыки */}
        <section>
          <h2>🛠 Навыки</h2>
          <ul>
            <li>Python, ETL, визуализация данных</li>
            <li>PostgreSQL</li>
            <li>Проектирование систем, IDEF0, UML, Use case</li>
            <li>Компьютерные сети (базовый уровень)</li>
            <li>Коммуникация с отделами компании</li>
            <li>Методология Scrum, Kanban</li>
          </ul>
        </section>

        {/* Дополнительная информация */}
        <section>
          <h2>ℹ️ Дополнительная информация</h2>
          <p>
            Люблю изучать новое. В вузе работал с микроконтроллерами (ESP8266 и STM32) и Java.
          </p>
          <p>Опыт программирования(не коммерческий) на C/C++, Python, Java.</p>
          <p>Сейчас занимаюсь BI-аналитикой, интересуюсь системным дизайном и в целом актуальными технологиями.</p>
          <p>Считаю себя ответственным и пунктуальным человеком, люблю спорт и шахматы.</p>
        </section>
      </main>

      <div className={`modal ${showForm ? "show" : ""}`}>
        <div className="modal-content">
          <h2>Связаться со мной</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Имя"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Telegram / Email"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              required
            />
            <textarea
              placeholder="Сообщение"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
            <div className="buttons">
  <button type="submit">Отправить</button>
  <button type="button" onClick={() => setShowForm(false)}>Закрыть</button>
</div>
          </form>
          {submitted && <p className="success-msg">Сообщение отправлено!</p>}
        </div>
      </div>
    </div>
  );
}

export default App;