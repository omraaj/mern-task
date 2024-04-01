# mern-task
# MERN Task 

This is  MERN  Intern Task (MongoDB, Express.js, React.js, Node.js) project that Displays the data of the selected month from dropdown , where data is fetched from api's made for card,chart and table.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/omraaj/mern-task.git

2.Navigate to the project directory:
```bash
cd mern-task
```

3. Install Dependencies
```bash
npm install
```

4.Run the backend 
```bash
cd task2
node server.js
```

## Endpoints
```http
/start
```
Method: GET
Description: Initialize database with initial data.
Response: Success message or error message


```http
/getlist 
```
Method: GET
Description:Get a list of all transactions.
Response: Array of transactions.

```http
/barchart
```
Method: GET
Description: Generate data for a bar chart.
Response: Data suitable for rendering a bar chart

```http
/piechart
```
Method: GET
Description: Generate data for a pie chart.
Response: Data suitable for rendering a pie chart

```http
/statistics
```
Method: GET
Description: Get statistical information about the transactions.
Response: Statistical data (e.g., total count, average, etc.)



## In all of the above end points you can enter params of month (key) like 01,02,03,04 ..etc 









