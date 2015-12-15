<?
//Last FM Data
$username = 'mr7kill';
define(API_KEY, '59c75ce54be869532e03f89b19edd849');
$scrobbler_url = 'http://ws.audioscrobbler.com/2.0/?method=user.getRecentTracks&user=' . $username . '&api_key=' . API_KEY . '&limit=2';
$xml = file_get_contents($scrobbler_url);
$movies = new SimpleXMLElement($xml);

//Getting string
foreach ($movies->xpath('//track') as $character) {
     $string .= $character->artist;
     $string .= ' - ';
     $string .= $character->name;
    break;
}

//Prefix tweaks
$pretext = "Last Played: ";					//If 'track' node has attribute 'nowplayig'
if($movies->xpath('//track/@nowplaying'))	//and it's equal to 'true' 
	$pretext = "Now Playing: ";				//In practice: if 'nowplaying' attrubite exists it's always equal to 'true'


//Randomizer
switch (rand('0','3')) {
    case 0:
        $im = imagecreatefrompng('pics/andrasta/andrasta1.png');
        $font = "Fonts/Rock Salt.ttf";
        $font_size = 12;
        $text_color = imagecolorallocate($im, 169, 62, 214);
        $x = 10;
        $y = 135;										//Padding top
    break;
    case 1:
        $im = imagecreatefrompng('pics/andrasta/andrasta2.png');
        $font = "Fonts/Gloria Hallelujah.ttf";
        $font_size = 14;
        $text_color = imagecolorallocate($im, 147, 4, 55);
        $x = 10;
        $y = 135;
    break;
    case 2:
        $im = imagecreatefrompng('pics/andrasta/andrasta3.png');
        $font = "Fonts/Bangers.ttf";
        $font_size = 14;
        $text_color = imagecolorallocate($im, 199, 0, 63);
        $x = 10;
        $y = 140;
    break;
    case 3:
    	$im = imagecreatefrompng('pics/andrasta/andrasta4.png');
        $font = "Fonts/Love Ya Like A Sister.ttf";
        $font_size = 16;
        $text_color = imagecolorallocate($im, 217, 2, 210);
        $x = 10;
        $y = 135;
    break;
} 

//Painting text on the picture
imagettftext($im, $font_size, 0, $x, $y, $text_color, $font, $pretext . $string);
header("Content-type: image/png");	//Header tweaks. Jpeg should have different content-type
imagepng($im);	//Show pic
imageDestroy($im);	//Destroy pic from memory
?>