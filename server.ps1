# Shahi Weaves Localhost Server (Native PowerShell)
# Serving files on http://localhost:8000

$port = 8000
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")

try {
    $listener.Start()
    Write-Host "==========================================================" -ForegroundColor Yellow
    Write-Host "  SHAHI WEAVES LOCAL SERVER STARTED SUCCESSFULLY" -ForegroundColor Red
    Write-Host "  Listening on: http://localhost:$port/" -ForegroundColor Yellow
    Write-Host "  Press [Ctrl + C] in this window to stop the server." -ForegroundColor Yellow
    Write-Host "==========================================================" -ForegroundColor Yellow

    # Automatically launch the default browser
    Start-Process "http://localhost:$port/"

    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        # Clean URL path and map root to index.html
        $rawPath = $request.Url.LocalPath
        if ($rawPath -eq "/") {
            $rawPath = "/index.html"
        }

        # Resolve path safely within the script directory
        $relativePath = $rawPath.TrimStart('/')
        $safePath = [System.IO.Path]::GetFullPath((Join-Path $PSScriptRoot $relativePath))
        
        # Verify the file is inside the script root directory to prevent directory traversal
        if (-not $safePath.StartsWith($PSScriptRoot)) {
            $response.StatusCode = 403
            $response.Close()
            continue
        }

        if (Test-Path $safePath -PathType Leaf) {
            # Map extensions to proper MIME content-types
            $ext = [System.IO.Path]::GetExtension($safePath).ToLower()
            $contentType = switch ($ext) {
                ".html" { "text/html; charset=utf-8" }
                ".css"  { "text/css" }
                ".js"   { "application/javascript; charset=utf-8" }
                ".jpg"  { "image/jpeg" }
                ".jpeg" { "image/jpeg" }
                ".png"  { "image/png" }
                ".webp" { "image/webp" }
                ".svg"  { "image/svg+xml" }
                default { "application/octet-stream" }
            }

            try {
                $bytes = [System.IO.File]::ReadAllBytes($safePath)
                $response.ContentType = $contentType
                $response.ContentLength64 = $bytes.Length
                $response.OutputStream.Write($bytes, 0, $bytes.Length)
            }
            catch {
                $response.StatusCode = 500
            }
        }
        else {
            $response.StatusCode = 404
            $errMessage = [System.Text.Encoding]::UTF8.GetBytes("404 File Not Found")
            $response.ContentType = "text/plain"
            $response.OutputStream.Write($errMessage, 0, $errMessage.Length)
        }

        $response.Close()
    }
}
catch {
    Write-Error $_
}
finally {
    $listener.Stop()
}
