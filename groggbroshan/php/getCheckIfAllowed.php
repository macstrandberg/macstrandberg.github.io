<?php
define("ACCESS_ALLOWED", 1);
include "vars.php";

if ($_SERVER['REMOTE_ADDR'] == $allowed_ip) {
  echo true;
} else {
  echo false;
}