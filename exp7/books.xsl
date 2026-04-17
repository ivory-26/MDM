<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="/">
        <html>
            <head>
                <title>Bookstore Inventory</title>
                <style>
                    body {
                        font-family: 'Outfit', sans-serif;
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        min-height: 100vh;
                        margin: 0;
                        color: #2d3436;
                    }
                    .glass-card {
                        background: rgba(255, 255, 255, 0.95);
                        backdrop-filter: blur(10px);
                        border-radius: 24px;
                        padding: 40px;
                        box-shadow: 0 20px 40px rgba(0,0,0,0.2);
                        width: 90%;
                        max-width: 900px;
                        animation: fadeIn 0.8s ease-out;
                    }
                    @keyframes fadeIn {
                        from { opacity: 0; transform: translateY(20px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                    h1 {
                        text-align: center;
                        color: #1a1a1a;
                        margin-bottom: 30px;
                        font-weight: 700;
                        letter-spacing: -0.5px;
                        background: linear-gradient(to right, #667eea, #764ba2);
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                    }
                    table {
                        width: 100%;
                        border-collapse: separate;
                        border-spacing: 0;
                        border-radius: 12px;
                        overflow: hidden;
                    }
                    th {
                        background-color: #f8f9fa;
                        color: #636e72;
                        font-weight: 600;
                        text-transform: uppercase;
                        font-size: 13px;
                        padding: 18px 20px;
                        text-align: left;
                        border-bottom: 2px solid #edf2f7;
                    }
                    td {
                        padding: 18px 20px;
                        background-color: #ffffff;
                        border-bottom: 1px solid #f1f3f5;
                        font-size: 15px;
                        transition: all 0.2s;
                    }
                    tr:last-child td {
                        border-bottom: none;
                    }
                    tr:hover td {
                        background-color: #f8faff;
                        transform: scale(1.002);
                        color: #744ebc;
                    }
                    .price-tag {
                        background: #eef2ff;
                        color: #4f46e5;
                        padding: 4px 12px;
                        border-radius: 20px;
                        font-weight: 600;
                        font-size: 14px;
                    }
                    .author-name {
                        color: #636e72;
                        font-style: italic;
                    }
                </style>
                <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700&amp;display=swap" rel="stylesheet" />
            </head>
            <body>
                <div class="glass-card">
                    <h1>📚 Book Inventory</h1>
                    <table>
                        <thead>
                            <tr>
                                <th>Book Title</th>
                                <th>Author</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            <xsl:for-each select="bookstore/book">
                                <tr>
                                    <td><strong><xsl:value-of select="title"/></strong></td>
                                    <td class="author-name"><xsl:value-of select="author"/></td>
                                    <td><span class="price-tag">$<xsl:value-of select="price"/></span></td>
                                </tr>
                            </xsl:for-each>
                        </tbody>
                    </table>
                </div>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>
