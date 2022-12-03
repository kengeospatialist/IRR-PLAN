<?php
$path = 'temp/';
if ($handle = opendir($path)) {

    while (false !== ($file = readdir($handle))) { 
        $filelastmodified = filemtime($path . $file);
        //24 hours in a day * 3600 seconds per hour
        if((time() - $filelastmodified) > ((10/60)*3600))
        {
           unlink($path .$file );//$path .$file
        }

    }
    closedir($handle); 
}
?>