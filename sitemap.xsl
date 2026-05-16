<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" 
                xmlns:html="http://www.w3.org/TR/REC-html40"
                xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
	<xsl:template match="/">
		<html xmlns="http://www.w3.org/1999/xhtml">
			<head>
				<title>XML Sitemap | Alick Idemyor Mene Foundation</title>
				<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
				<style type="text/css">
					body {
						font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
						color: #333;
						margin: 0;
						padding: 40px;
						background-color: #f8f6fa;
					}
					.container {
						max-width: 900px;
						margin: 0 auto;
						background: #fff;
						padding: 40px;
						border-radius: 16px;
						box-shadow: 0 10px 30px rgba(74, 40, 108, 0.08);
					}
					h1 {
						color: #4a286c;
						font-size: 28px;
						margin-bottom: 10px;
						font-weight: 700;
					}
					p {
						color: #666;
						font-size: 16px;
						margin-bottom: 30px;
						line-height: 1.6;
					}
					table {
						width: 100%;
						border-collapse: collapse;
						margin-top: 20px;
					}
					th {
						text-align: left;
						padding: 15px;
						background-color: #4a286c;
						color: #fff;
						font-weight: 600;
						font-size: 14px;
						text-transform: uppercase;
						letter-spacing: 1px;
					}
					th:first-child { border-radius: 8px 0 0 0; }
					th:last-child { border-radius: 0 8px 0 0; }
					td {
						padding: 15px;
						border-bottom: 1px solid #eee;
						font-size: 15px;
					}
					tr:hover td {
						background-color: #fcfaff;
					}
					a {
						color: #4a286c;
						text-decoration: none;
						font-weight: 500;
						transition: color 0.3s;
					}
					a:hover {
						color: #e6a822;
						text-decoration: underline;
					}
					.footer {
						margin-top: 40px;
						text-align: center;
						font-size: 13px;
						color: #999;
					}
				</style>
			</head>
			<body>
				<div class="container">
					<h1>XML Sitemap</h1>
					<p>This is a human-readable XML sitemap for the <strong>Alick Idemyor Mene Foundation</strong> website. It helps search engines discover and crawl all the pages on the site.</p>
					
					<table>
						<thead>
							<tr>
								<th>URL</th>
								<th>Last Modified</th>
								<th>Change Frequency</th>
								<th>Priority</th>
							</tr>
						</thead>
						<tbody>
							<xsl:for-each select="sitemap:urlset/sitemap:url">
								<tr>
									<td>
										<xsl:variable name="itemURL">
											<xsl:value-of select="sitemap:loc"/>
										</xsl:variable>
										<a href="{$itemURL}">
											<xsl:value-of select="sitemap:loc"/>
										</a>
									</td>
									<td>
										<xsl:value-of select="sitemap:lastmod"/>
									</td>
									<td>
										<xsl:value-of select="sitemap:changefreq"/>
									</td>
									<td>
										<xsl:value-of select="sitemap:priority"/>
									</td>
								</tr>
							</xsl:for-each>
						</tbody>
					</table>
					
					<div class="footer">
						&copy; 2026 Alick Idemyor Mene Foundation. Generated for search engine optimization.
					</div>
				</div>
			</body>
		</html>
	</xsl:template>
</xsl:stylesheet>
