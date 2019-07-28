Add-Type -AssemblyName System.Windows.Forms


#[Byte[]] $request = 0xAA,0x11,0xFE,0x01,0x01,0x11
[Byte[]] $request = 0x08,0x22,0x00,0x00,0x00,0x00,0xD6 
$port= new-Object System.IO.Ports.SerialPort COM1,9600,None,8,one
$port.Open()
$port.Write($request, 0, $request.Count)
$port.Close()
Start-Sleep -Seconds 2
[Windows.Forms.Sendkeys]::SendWait("%{TAB}")