# AI Procurement Agent

Платформа для анализа госзакупок и подбора поставщиков с использованием AI.

## Возможности

* Поиск лотов (goszakup)
* Анализ цен (мин / средняя / макс)
* Подбор поставщиков (Kaspi, WB, Alibaba)
* Расчет прибыли и налогов
* AI рекомендации
* Чат и заявки

## Запуск локально

### 1. Установить зависимости

```bash
pip install fastapi uvicorn requests beautifulsoup4 pandas
```

### 2. Запуск backend

```bash
uvicorn main:app --reload
```

### 3. Открыть сайт

```
http://127.0.0.1:8000
```

## Структура

* `main.py` — backend (FastAPI)
* `static/` — frontend
* `data/` — данные

## Автор

Asylzhan
