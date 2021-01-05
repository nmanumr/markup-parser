import {Parser} from "../src/parser.js";
import {checkLength, checkRegex} from '../src/checkers.js'

const parser = new Parser();

parser.registerBlock('main', {
  'html>head': checkLength(1699),
  '.label-default.label_without_bg': checkRegex('(?<rollNumber>(FA|SP)\\d{2}-\\w{3}-\\d{3})'),
})

console.log(parser.parse(`<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">

    <title>CUOnline Student Portal</title>

    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="">
    <!-- HTML5 shim, for IE6-8 support of HTML5 elements -->
    <!--[if lt IE 9]>
    <script src="js/html5shiv.js"></script>
    <![endif]-->
    <!-- Fav and touch icons -->

    <link rel="apple-touch-icon-precomposed" sizes="144x144" href="/Content/img/apple-touch-icon-144-precomposed.png">
    <link rel="apple-touch-icon-precomposed" sizes="114x114" href="/Content/img/apple-touch-icon-114-precomposed.png">
    <link rel="apple-touch-icon-precomposed" sizes="72x72" href="/Content/img/apple-touch-icon-72-precomposed.png">
    <link rel="apple-touch-icon-precomposed" href="/Content/img/apple-touch-icon-57-precomposed.png">
    <link rel="shortcut icon" href="/Content/img/fav.png">

    <link href="/Content/css/bootstrap.css" rel="stylesheet" />
    <link href="/Content/css/style.css" rel="stylesheet" />
    <link href="/Content/css/style_cuonline_portal.css" rel="stylesheet" />


    <script src="/Content/js/jquery-1.10.2.js"></script>
    <script src="/Content/js/bootstrap.js"></script>


    <script src="/Content/js/html5shiv.js"></script>
    <script src="/Content/js/less-1.3.3.js"></script>
    <script src="/Content/js/MenuActivation.js"></script>


</head>
<style>
    .main_body .content_area {
        padding: 0 0 10px 0;
        margin: 10px 0;
    }

    .main_body .content_area .title_search_area {
        border-radius: 0;
    }

    .question_box h3 {
        margin: 50px 0;
        text-align: center;
        font-size: 30px;
    }
</style>


<body>
    <script>

        //paste this code under the head tag or in a separate js file.
        // Wait for window load
        $(window).load(function () {
            // Animate loader off screen
            $(".se-pre-con").fadeOut("slow");;
        });
    </script>

    <div class="container">
        
<header>
    <div class="row clearfix top_row">
        <div class="inner_row">
            <div class="col-md-12 column">
                <span title="- S/D/O -" class="label label-default label_without_bg"><b>Welcome :
                        CIIT/AA00-BBB-000/LHR</b></span>
            </div>
        </div>
    </div>
    <div class="row clearfix logo_menu_row">
        <div class="inner_row">
            <div class="col-md-4 column logo">
                <div>
                    <img alt="100x100" src="/Content/img/logo_with_text.png">
                </div>
            </div>
            <div class="col-md-6 column rounded_menu_boxes">
                <ul class="pull-right">
                    <li><a title="Home" class="home" id="Dash_Board" href="/Courses">Dashboard</a><span></span></li>
                    <li><a title="Course Registration Card" class="regCard" id="Registration_Card"
                            href="/RegistrationCard">Registration Card</a><span></span></li>
                    <li><a title="Student Fees" class="fees" id="Fees" href="/Fees">Fees</a><span></span>
                    </li>
                    <li><a title="Result Card" class="marks" id="Result_Card" href="/ResultCard">Result
                            Card</a><span></span></li>
                    <li><a title="My Profile" class="attndnce" id="My_Profile"
                            href="/Profile">Profile</a><span></span></li>

                    <li><a title="Logout" class="reports" id="Sign_Out"
                            href="/Login/Sign_out">Logout</a><span></span>
                    </li>
                </ul>
            </div>
            <div class="col-md-2 column " style="padding-right:0">
                <script language="javascript" type="text/javascript">
                    $(document).ready(function () {
                        $("#divImageHolder").addClass("StudentPictureSpinner");
                        var imageUrl = "/Login/GetBase64Image";
                        $.ajax({
                            cache: false,
                            type: "GET",
                            url: imageUrl,
                            contentType: 'application/json',
                            dataType: "json",
                            success: function (data) {
                                //debugger;
                                $("#divImageHolder").removeClass("StudentPictureSpinner");
                                var image = data.base64image;
                                if (image.length > 0) {
                                    $("#divImageHolder").html("<img  style='float:right' src='data:image/jpg;base64," + image + "'/>");
                                }
                                else {
                                    $("#divImageHolder").html("No Picture Avaiable.");
                                }

                            },
                            error: function (xhr) {
                                $("#divImageHolder").removeClass("StudentPictureSpinner");
                                $("#divImageHolder").html("Unable to load Picture.");
                            }
                        });
                    });

                </script>
                <div id="divImageHolder" class="StudentPicture">
                </div>
            </div>
            <div class="col-md-9 column mobile_menu">
                <nav class="navbar navbar-default" role="navigation">
                    <div class="navbar-header">
                        <button type="button" class="navbar-toggle" data-toggle="collapse"
                            data-target="#bs-example-navbar-collapse-1">
                            <span class="sr-only">Toggle navigation</span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                        </button>
                        <a class="navbar-brand" href="javascript:void(0);">Menu</a>
                    </div>

                    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <ul class="nav navbar-nav">
                            <li><a id="DashBoard" href="/Courses">Dashboard</a></li>
                            <li><a id="RegistrationCard" href="/RegistrationCard">Registration Card</a></li>
                            <li><a id="Fees" href="/Fees">Fees</a></li>
                            <li><a id="ResultCard" href="/ResultCard">Result Card</a></li>
                            <li><a id="MyProfile" href="/Profile">Profile</a></li>
                            <li><a id="SupportSystem" href="/Profile">HelpDesk</a></li>
                            <li><a id="SignOut" href="/Login/Sign_out">Logout</a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </div>
    </div>
    
    
</header>


        <div class="main_body">
            <div style="min-height: 250px;" class="content_area">
                <style>
                    .no-js #loader {
                        display: none;
                    }

                    .js #loader {
                        display: block;
                        position: absolute;
                        left: 100px;
                        top: 0;
                    }

                    .se-pre-con {
                        position: fixed;
                        left: 0px;
                        top: 0px;
                        width: 100%;
                        height: 100%;
                        z-index: 9999;
                        background: url(Content/img/Preloader_2.gif) center no-repeat #fff;
                    }
                </style>
                <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.5.2/jquery.min.js"></script>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/modernizr/2.8.2/modernizr.js"></script>

                <div class="se-pre-con">
                </div>

                
<link href="/Content/css/Dashboard.css" rel="stylesheet" />
<script src="/Content/js/progressBarTimer.js"></script>

<div class="table-responsive quiz_listing">
    <div id="RegisteredCourses">
        <div
            style="background:#13A89E;margin: 10px;text-align: center;padding: 10px;font-weight: bold;color: white;font-size: 18px;">
            Registered Courses List</div>
    </div>
</div>


            </div>
        </div>

        <footer>
            <div class="col-md-12 column footer_menu">
                <div title="CUONLINE Student Portal Update Version Number 7.0" class="inner_row">
                    <p>
                        <a style="font-weight: bold;font-size: 15px;" href="http://itscomsats.com/" target="_blank">
                            CUOnline
                        </a>, Principal Seat &copy; 2018-COMSATS &reg;
                    </p>
                </div>
            </div>
        </footer>
    </div>
</body>

</html>`));
