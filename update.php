<!DOCTYPE HTML>
<html lang="pl-PL">

<head>
    <meta http-equiv="content-type" content="text/html; charset=utf-8" />
    <meta name="keywords" content="" />
    <meta name="description" content="" />

    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-+0n0xVW2eSR5OomGNYDnhzAbDsOXxcvSN1TPprVMTNDbiYZCxYbOOl7+AMvyTG2x" crossorigin="anonymous">
    <link href="https://fonts.googleapis.com/css?family=KoHo|Lobster" rel="stylesheet">
    <link rel="stylesheet" href="./reset.css">
    <link rel="stylesheet" href="./style.css">
</head>
<body>
    <script>
    $(document).ready(function() {
  $(window).keydown(function(event){
    if(event.keyCode == 13) {
      event.preventDefault();
      return false;
    }
  });
});
</script>
    <form action="checkout.php" method="post">
        <input type="password" name="psw">&nbsp<button type="submit">Submit</button><br/>
        <?php
            $handle = file("dictionary.umg");
            $nr = 0;
            foreach ($handle as $line) 
            {
                $arr = explode("=", $line);
                echo "<input value=\"$arr[0]\" name=$nr>&nbsp<input value=\"$arr[1]\" name=".($nr+1)."><br/>";
                $nr+=2;
            }
        ?>
    </form>
</body>