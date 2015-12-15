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
switch (rand('0','7')) {
    case 0:
        $im = imagecreatefrompng('pics/h2.png');			//Image path
        $font = "Fonts/DancingScript.ttf";					//Font path
        $font_size = 16;									//Font size (fonts have different size scale)
        $text_color = imagecolorallocate($im, 255, 0, 0);	//Text color in RGB format
        $x = 30;											//Padding left
        $y = 132;											//Padding top
    break;
    case 1:
        $im = imagecreatefrompng('pics/rin.png');
        $font = "Fonts/Cinzel.ttf";
        $font_size = 14;
        $text_color = imagecolorallocate($im, 0, 87, 128);
        $x = 12;
        $y = 132;
    break;
    case 2:
        $im = imagecreatefrompng('pics/yukinon.png');
        $font = "Fonts/Indie Flower.ttf";
        $font_size = 16;
        $text_color = imagecolorallocate($im, 0, 104, 201);
        $x = 15;
        $y = 132;
    break;
    case 3:
    	$im = imagecreatefrompng('pics/cc.png');
        $font = "Fonts/Cabin Sketch.ttf";
        $font_size = 16;
        $text_color = imagecolorallocate($im, 238, 238, 0);
        $x = 15;
        $y = 132;
    break;
    case 4:
    	$im = imagecreatefrompng('pics/shinoa.png');
        $font = "Fonts/Permanent Marker.ttf";
        $font_size = 16;
        $text_color = imagecolorallocate($im, 206, 147, 250);
        $x = 15;
        $y = 132;
    break;
    case 5:
    	$im = imagecreatefrompng('pics/eru.png');
        $font = "Fonts/Gloria Hallelujah.ttf";
        $font_size = 16;
        $text_color = imagecolorallocate($im, 240, 29, 205);
        $x = 15;
        $y = 132;
    break;
    case 6:
    	$im = imagecreatefrompng('pics/kao2.png');
        $font = "Fonts/The Girl Next Door.ttf";
        $font_size = 16;
        $text_color = imagecolorallocate($im, 232, 240, 0);
        $x = 15;
        $y = 132;
    break;
        case 7:
    	$im = imagecreatefrompng('pics/rori.png');
        $font = "Fonts/New Rocker.ttf";
        $font_size = 16;
        $text_color = imagecolorallocate($im, 184, 0, 0);
        $x = 8;
        $y = 135;
    break;
} 

//Painting text on the picture
imagettftext($im, $font_size, 0, $x, $y, $text_color, $font, $pretext . $string);
header("Content-type: image/png");	//Header tweaks. Jpeg should have different content-type
imagepng($im);	//Show pic
imageDestroy($im);	//Destroy pic from memory
?>