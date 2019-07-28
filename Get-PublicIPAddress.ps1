Function script:Get-PublicIPv4Address {
#https://ipinfo.io/developers
[CmdletBinding()]
    param(
	    [Parameter(HelpMessage="Specify the URL to query")]
		[string]$IPInfoURL = "ipinfo.io/json"
	)
	$IPInfo = Invoke-WebRequest $IPInfoURL
	If ($IPInfo -notlike $null) {
		$IPObject = ConvertFrom-Json $IPInfo.Content
		$IPAddr = $IPObject.ip
        Write-Verbose "Current public IP is $IPAddr"
        $Obj = [PSCustomObject]@{
            name="IPv4Address"
            value="$IPAddr"
        }
        $Obj | ConvertTo-Json
	}
	Else {
		Write-Error "No content found in web response from $IPInfoURL"
	}
} #End Get-PublicIPv4Address

. Get-PublicIPv4Address
