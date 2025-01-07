# Daily Schedule Management System

## 專案簡介
這是一個日程管理系統，旨在幫助使用者有效地管理個人的日常行程，讓使用者能夠輕鬆創建、查看、更新和刪除日程。  
該系統包含前端和後端兩個部分：
- **前端**部分由 React 實現，用戶可以通過網頁界面進行操作。
- **後端**部分使用 Node.js 與 Express 搭建，並使用 MongoDB 作為資料庫來儲存使用者的日程數據。

## 專案目標
本專案的目標是提供一個簡單易用的日程管理系統，允許使用者：
- 創建新的日程
- 查看已存在的日程
- 更新日程的詳細資訊
- 刪除不再需要的日程

透過這個專案，我們希望提供一個實用的工具，幫助使用者提高日常生活的組織效率。

---

## 技術選擇原因

### 前端 (React)
- React 是一個流行的 JavaScript 庫，用於構建用戶界面。由於其組件化的設計，React 讓開發者能夠將複雜的界面分解為小的、可重用的組件，有助於提高開發效率與維護性。
- React 擁有豐富的生態系統，適用於開發動態單頁應用（SPA），符合我們對日程管理系統快速響應的需求。

### 後端 (Node.js 與 Express)
- Node.js 是一個基於 Chrome V8 引擎的 JavaScript 執行環境，具有高效能和非同步 I/O，適合處理大量請求，因此適合用來搭建後端服務。
- Express 是一個輕量級的 Web 框架，能夠簡化 Node.js 中的路由設計，並快速建立 API，讓開發者能夠專注於業務邏輯而非繁瑣的配置。

### 資料庫 (MongoDB)
- MongoDB 是一個 NoSQL 資料庫，專為儲存大量結構化和非結構化資料而設計。由於其靈活的文件結構（JSON-like documents），非常適合儲存像日程這類的資料，並且便於擴展。

### API 驗證與安全 (JWT)
為了保障使用者資料的安全，我們使用 JWT (JSON Web Token) 來進行使用者認證與授權，確保只有合法用戶能夠訪問敏感資料。

---

## 架構說明
此專案由前端、後端和資料庫三大部分組成，並使用 RESTful API 進行前端和後端之間的通信。

### 1. 前端
- 使用 React 搭建，提供用戶與系統交互的界面。
- 用戶能夠透過前端網頁進行 CRUD（創建、讀取、更新、刪除）操作。
- 前端發送 HTTP 請求至後端 API，並接收回應資料來更新 UI。

### 2. 後端
- 使用 Node.js + Express 建立 RESTful API，處理來自前端的請求。
- API 主要處理日程的 CRUD 操作。
- 資料存儲在 MongoDB 資料庫中，並通過 Mongoose 進行操作。

### 3. 資料庫
- 使用 MongoDB 儲存日程資料，並使用 Mongoose 管理資料模型和查詢。
- 每個日程包含標題、描述和日期等欄位。

---

## 整體流程
1. 用戶通過前端界面提交請求（如創建日程、更新日程等）。
2. 前端將請求發送到後端的 API。
3. 後端處理請求，進行資料庫操作並回傳結果。
4. 前端根據回傳結果更新 UI。

---

## 安裝與執行指引

### 1. 複製專案
首先，複製專案到你的本地環境：

```bash
git clone https://github.com/hijirimzsiro/final-project.git
cd final-project
```

### 2. 安裝依賴
進入 backend 目錄並安裝後端所需的 Node.js 依賴：
```bash
cd backend
npm install
```
同樣進入 frontend 目錄並安裝前端所需的依賴：
```bash
cd frontend
npm install
```

### 3. 配置環境變數
在 backend 目錄下創建一個 .env 文件來存儲環境變數，確保資料庫連接等設定正常。範例：
```bash
MONGODB_URI=mongodb://localhost:27017/dailyroutine
PORT=5000
```

### 4. 執行後端
在 backend 目錄下，啟動後端伺服器：
```bash
cd backend
npm start
```
### 5. 執行前端
在 frontend 目錄下，啟動前端伺服器：
```bash
cd frontend
npm start
```

前端應用會在 http://localhost:3000 上啟動，你可以在瀏覽器中查看。

### 6. 測試功能
你可以透過前端網頁進行操作來測試整個系統的功能：

增加日程  
刪除日程  
修改日程  
查看日程  



