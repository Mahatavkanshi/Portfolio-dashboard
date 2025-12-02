export const DashboardPage = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Dashboard - Portfolio</title>
            <style>
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }
                body {
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    background: #f5f7fa;
                    color: #333;
                }
                .navbar {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    padding: 20px 40px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                }
                .navbar h1 {
                    font-size: 24px;
                }
                .navbar-links {
                    display: flex;
                    gap: 20px;
                    align-items: center;
                }
                .navbar-links a, .logout-btn {
                    color: white;
                    text-decoration: none;
                    font-weight: 500;
                    cursor: pointer;
                    border: none;
                    background: none;
                    font-size: 14px;
                    transition: opacity 0.3s;
                }
                .navbar-links a:hover, .logout-btn:hover {
                    opacity: 0.8;
                }
                .logout-btn {
                    background: rgba(255, 255, 255, 0.2);
                    padding: 8px 16px;
                    border-radius: 4px;
                }
                .container {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 40px 20px;
                }
                .dashboard-header {
                    margin-bottom: 40px;
                }
                .dashboard-header h2 {
                    font-size: 32px;
                    color: #333;
                    margin-bottom: 10px;
                }
                .dashboard-header p {
                    color: #777;
                    font-size: 16px;
                }
                .stats-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                    gap: 20px;
                    margin-bottom: 40px;
                }
                .stat-card {
                    background: white;
                    padding: 25px;
                    border-radius: 8px;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
                    transition: transform 0.3s, box-shadow 0.3s;
                }
                .stat-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
                }
                .stat-card h3 {
                    color: #667eea;
                    font-size: 14px;
                    text-transform: uppercase;
                    margin-bottom: 10px;
                    letter-spacing: 1px;
                }
                .stat-card .value {
                    font-size: 32px;
                    font-weight: bold;
                    color: #333;
                }
                .section {
                    background: white;
                    padding: 30px;
                    border-radius: 8px;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
                    margin-bottom: 30px;
                }
                .section h3 {
                    font-size: 22px;
                    color: #333;
                    margin-bottom: 20px;
                    border-bottom: 2px solid #667eea;
                    padding-bottom: 10px;
                }
                .table-container {
                    overflow-x: auto;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                }
                th {
                    background: #f5f7fa;
                    padding: 15px;
                    text-align: left;
                    font-weight: 600;
                    color: #555;
                    border-bottom: 2px solid #ddd;
                }
                td {
                    padding: 15px;
                    border-bottom: 1px solid #ddd;
                }
                tr:hover {
                    background: #f9f9f9;
                }
                .action-btn {
                    padding: 6px 12px;
                    margin-right: 8px;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 12px;
                    transition: all 0.3s;
                }
                .edit-btn {
                    background: #667eea;
                    color: white;
                }
                .edit-btn:hover {
                    background: #5568d3;
                }
                .delete-btn {
                    background: #e74c3c;
                    color: white;
                }
                .delete-btn:hover {
                    background: #c0392b;
                }
                .message {
                    margin-bottom: 20px;
                    padding: 15px;
                    border-radius: 6px;
                    display: none;
                }
                .message.success {
                    background: #d4edda;
                    color: #155724;
                    border: 1px solid #c3e6cb;
                    display: block;
                }
                .message.error {
                    background: #f8d7da;
                    color: #721c24;
                    border: 1px solid #f5c6cb;
                    display: block;
                }
                .loading {
                    text-align: center;
                    padding: 20px;
                    color: #667eea;
                }
                .empty-state {
                    text-align: center;
                    padding: 40px;
                    color: #999;
                }
                .user-queries-section {
                    margin-left: 20px;
                    background: #f9f9f9;
                    padding: 15px;
                    border-radius: 4px;
                    margin-top: 10px;
                    border-left: 4px solid #667eea;
                }
                .user-queries-section h4 {
                    color: #667eea;
                    margin-bottom: 10px;
                    font-size: 14px;
                }
                .query-item {
                    background: white;
                    padding: 10px;
                    margin-bottom: 8px;
                    border-radius: 4px;
                    border-left: 3px solid #667eea;
                }
                .query-item p {
                    font-size: 13px;
                    margin: 5px 0;
                    color: #555;
                }
                .no-queries {
                    font-size: 12px;
                    color: #999;
                    font-style: italic;
                }
            </style>
        </head>
        <body>
            <nav class="navbar">
                <h1>📊 Portfolio Dashboard</h1>
                <div class="navbar-links">
                    <a href="/dashboard">Dashboard</a>
                    <a href="/profile">Profile</a>
                    <button class="logout-btn" onclick="logout()">Logout</button>
                </div>
            </nav>

            <div class="container">
                <div class="dashboard-header">
                    <h2>Welcome to Your Dashboard</h2>
                    <p>Manage your portfolio and track your queries</p>
                </div>

                <div id="message" class="message"></div>

                <!-- Stats Section -->
                <div class="stats-grid">
                    <div class="stat-card">
                        <h3>Total Queries</h3>
                        <div class="value" id="totalQueries">0</div>
                    </div>
                    <div class="stat-card">
                        <h3>Total Users</h3>
                        <div class="value" id="totalUsers">0</div>
                    </div>
                    <div class="stat-card">
                        <h3>Users with Queries</h3>
                        <div class="value" id="usersWithQueries">0</div>
                    </div>
                </div>

                <!-- Users with Their Queries Section -->
                <div class="section">
                    <h3>👥 Users & Their Queries</h3>
                    <div class="table-container">
                        <table id="usersQueriesTable">
                            <thead>
                                <tr>
                                    <th>User ID</th>
                                    <th>Username</th>
                                    <th>Email</th>
                                    <th>Joined Date</th>
                                    <th>Queries Count</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody id="usersQueriesBody">
                                <tr>
                                    <td colspan="6" class="loading">Loading users with queries...</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- All Queries Section -->
                <div class="section">
                    <h3>📨 All Queries</h3>
                    <div class="table-container">
                        <table id="queriesTable">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Message</th>
                                    <th>Date</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody id="queriesBody">
                                <tr>
                                    <td colspan="6" class="loading">Loading queries...</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
           
   
        </body>
        </html>
    `;