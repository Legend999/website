<?php
    include("psw.php");
    if(check_password($_POST["psw"])) /*not provided on github due to security reasons*/
    {
        $backup = file("dictionary.umg");
        $file = "backup.umg";
        $nr = 0;
        while(file_exists($nr.$file))
            ++$nr;
        $handle = fopen($nr.$file, "w");
        foreach($backup as $line)
            fwrite($handle, $line);
        fclose($handle);
        
        $handle = fopen("dictionary.umg", "w");
        for($i=0;$i<(count($_POST)-1);$i+=2) {
            if(trim($_POST[$i])!="" && trim($_POST[$i+1]!=""))
                fwrite($handle, $_POST[$i]."=".$_POST[$i+1]."\n");
        }
        fclose($handle);
        echo "Zmiany zostały dokonane";
        foreach($_POST as $key=>$value)
        {
            echo $value."<br>";
        }
    }
    else
    {
        echo "Błędne hasło";
    }
?>