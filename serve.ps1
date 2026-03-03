# Mr Phone 67 - Serveur Local PWA
$port = 8080
$basePath = $PSScriptRoot

# Get local IP for display
try {
    $ip = (Get-NetIPAddress -AddressFamily IPv4 | Where-Object { $_.InterfaceAlias -notlike '*Loopback*' -and $_.PrefixOrigin -ne 'WellKnown' } | Select-Object -First 1).IPAddress
}
catch { $ip = "localhost" }
if (-not $ip) { $ip = "localhost" }

# Try ports 8080-8085
$listener = $null
for ($p = 8080; $p -le 8085; $p++) {
    try {
        $listener = New-Object System.Net.HttpListener
        $listener.Prefixes.Add("http://localhost:$p/")
        $listener.Start()
        $port = $p
        break
    }
    catch {
        $listener = $null
        continue
    }
}

if (-not $listener) {
    Write-Host "  ERREUR: Impossible de demarrer le serveur (ports 8080-8085 occupes)" -ForegroundColor Red
    Read-Host "  Appuyez sur Entree pour quitter"
    exit
}

Write-Host ""
Write-Host "  ======================================" -ForegroundColor Cyan
Write-Host "    Mr Phone 67 - Serveur demarre !" -ForegroundColor Green
Write-Host "  ======================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "  Adresse locale:  http://localhost:$port" -ForegroundColor White
Write-Host ""
Write-Host "  POUR TABLETTE SUR LE MEME RESEAU:" -ForegroundColor Magenta
Write-Host "  -> Ouvrez Chrome sur la tablette" -ForegroundColor White
Write-Host "  -> Tapez: http://${ip}:$port" -ForegroundColor Yellow
Write-Host "  -> Menu (3 pts) > Installer l'application" -ForegroundColor White
Write-Host ""
Write-Host "  Ctrl+C pour arreter" -ForegroundColor Gray
Write-Host ""

$mimeTypes = @{
    '.html' = 'text/html; charset=utf-8'
    '.css'  = 'text/css'
    '.js'   = 'application/javascript'
    '.json' = 'application/json; charset=utf-8'
    '.png'  = 'image/png'
    '.jpg'  = 'image/jpeg'
    '.svg'  = 'image/svg+xml'
    '.ico'  = 'image/x-icon'
    '.webp' = 'image/webp'
}

while ($listener.IsListening) {
    try {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response
        
        $localPath = $request.Url.LocalPath
        if ($localPath -eq '/') { $localPath = '/index.html' }
        
        $filePath = Join-Path $basePath ($localPath.TrimStart('/').Replace('/', '\'))
        
        if (Test-Path $filePath -PathType Leaf) {
            $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
            $contentType = if ($mimeTypes.ContainsKey($ext)) { $mimeTypes[$ext] } else { 'application/octet-stream' }
            $response.ContentType = $contentType
            $response.AddHeader('Cache-Control', 'no-cache')
            $bytes = [System.IO.File]::ReadAllBytes($filePath)
            $response.ContentLength64 = $bytes.Length
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
        }
        else {
            $response.StatusCode = 404
            $msg = [System.Text.Encoding]::UTF8.GetBytes("404")
            $response.ContentLength64 = $msg.Length
            $response.OutputStream.Write($msg, 0, $msg.Length)
        }
        $response.Close()
    }
    catch {}
}
