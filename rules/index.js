const {Parser, q} = MarkupParser;

const parser = new Parser();



const rules = {
  '$names': {
    '.table.table-striped.table-bordered.table-hover tr': 'subjectList',
  },
  '.table.table-striped.table-bordered.table-hover tr': {
    '$names': {
      'td:first-child': 'code',
    },
    'td:first-child': q.text().trim()
  },
};

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
<div class="table-responsive quiz_listing">
            <div id="RegisteredCourses">
                <div style="background:#13A89E;margin: 10px;text-align: center;padding: 10px;font-weight: bold;color: white;font-size: 18px;">Registered Courses List</div>
                <table class="table table-striped table-bordered table-hover">
                    <thead>
                        <tr>
                            <th width="">Course No</th>
                            <th width="">Course Name</th>
                            <th width="">Credits</th>
                            <th width="">Teacher</th>
                            <th title="Program - Semester - Description - Section" width="">Class</th>
                            <th>Attendance Summary</th>
                        </tr>
                    </thead>
                    <tbody>

                            <tr style=" cursor: pointer;" onclick="window.location='/Courses/SetCourse/50550'">
                                <td>
                                    CSC353          
                                </td>
                                    <td title="Theory and Lab Scheme Course">
                                        Computer Graphics
                                    </td>
                                <td>
                                    3
                                </td>
                                <td>
                                    Aamer Mehmood
                                </td>
                                <td>

                                    BCS 5 FA18-BCS-(AD) E-I A
                                </td>
                                <td>
                                            <div id="bar_50550-Class" title="Class Attendance" class="lab_class_attendance" aria-valuenow="93" aria-valuemin="0" aria-valuemax="93"></div>
                                            <script>
                                                $('#bar_50550-Class').progressBarTimer({ _percentage: 93, autoStart: true, timeLimit: 1, label: { show: true, type: 'percent' } });
                                            </script>
                                            <div id="bar_50550-Lab" title="Lab Attendance" class="lab_class_attendance" aria-valuenow="93" aria-valuemin="0" aria-valuemax="93"></div>
                                            <script>
                                                $('#bar_50550-Lab').progressBarTimer({ _percentage: 93, autoStart: true, timeLimit: 1, label: { show: true, type: 'percent' } });
                                            </script>

                                </td>
                            </tr>
                            <tr style=" cursor: pointer;" onclick="window.location='/Courses/SetCourse/49494'">
                                <td>
                                    CSC339          
                                </td>
                                    <td title="Theory and Lab Scheme Course">
                                        Data Communications and Computer Networks
                                    </td>
                                <td>
                                    3
                                </td>
                                <td>
                                    Imran Raza
                                </td>
                                <td>

                                    BCS 5 FA18-BCS-B B
                                </td>
                                <td>
                                            <div id="bar_49494-Class" title="Class Attendance" class="lab_class_attendance" aria-valuenow="87" aria-valuemin="0" aria-valuemax="87"></div>
                                            <script>
                                                $('#bar_49494-Class').progressBarTimer({ _percentage: 87, autoStart: true, timeLimit: 1, label: { show: true, type: 'percent' } });
                                            </script>
                                            <div id="bar_49494-Lab" title="Lab Attendance" class="lab_class_attendance" aria-valuenow="94" aria-valuemin="0" aria-valuemax="94"></div>
                                            <script>
                                                $('#bar_49494-Lab').progressBarTimer({ _percentage: 94, autoStart: true, timeLimit: 1, label: { show: true, type: 'percent' } });
                                            </script>

                                </td>
                            </tr>
                            <tr style=" cursor: pointer;" onclick="window.location='/Courses/SetCourse/49486'">
                                <td>
                                    CSC301          
                                </td>
                                    <td title="Theory Only Scheme Course">
                                        Design and Analysis of Algorithms
                                    </td>
                                <td>
                                    3
                                </td>
                                <td>
                                    Asmara Safdar
                                </td>
                                <td>

                                    BCS 5 FA18-BCS-B B
                                </td>
                                <td>
                                            <div id="bar_49486-Class" title="Class Attendance" class="only_class_attendance" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                                            <script>
                                                $('#bar_49486-Class').progressBarTimer({ _percentage: 100, autoStart: true, timeLimit: 1, label: { show: true, type: 'percent' } });
                                            </script>

                                </td>
                            </tr>
                            <tr style=" cursor: pointer;" onclick="window.location='/Courses/SetCourse/49498'">
                                <td>
                                    CSC475          
                                </td>
                                    <td title="Theory Only Scheme Course">
                                        Numerical Computing
                                    </td>
                                <td>
                                    3
                                </td>
                                <td>
                                    Majid Hasan Khattak
                                </td>
                                <td>

                                    BCS 5 FA18-BCS-B B
                                </td>
                                <td>
                                            <div id="bar_49498-Class" title="Class Attendance" class="only_class_attendance" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                                            <script>
                                                $('#bar_49498-Class').progressBarTimer({ _percentage: 100, autoStart: true, timeLimit: 1, label: { show: true, type: 'percent' } });
                                            </script>

                                </td>
                            </tr>
                            <tr style=" cursor: pointer;" onclick="window.location='/Courses/SetCourse/49490'">
                                <td>
                                    CSC322          
                                </td>
                                    <td title="Theory and Lab Scheme Course">
                                        Operating Systems
                                    </td>
                                <td>
                                    3
                                </td>
                                <td>
                                    Dr. Muhammad Waqas Anwar
                                </td>
                                <td>

                                    BCS 5 FA18-BCS-B B
                                </td>
                                <td>
                                            <div id="bar_49490-Lab" title="Lab Attendance" class="lab_class_attendance" aria-valuenow="97" aria-valuemin="0" aria-valuemax="97"></div>
                                            <script>
                                                $('#bar_49490-Lab').progressBarTimer({ _percentage: 97, autoStart: true, timeLimit: 1, label: { show: true, type: 'percent' } });
                                            </script>
                                            <div id="bar_49490-Class" title="Class Attendance" class="lab_class_attendance" aria-valuenow="93" aria-valuemin="0" aria-valuemax="93"></div>
                                            <script>
                                                $('#bar_49490-Class').progressBarTimer({ _percentage: 93, autoStart: true, timeLimit: 1, label: { show: true, type: 'percent' } });
                                            </script>

                                </td>
                            </tr>
                            <tr style=" cursor: pointer;" onclick="window.location='/Courses/SetCourse/49799'">
                                <td>
                                    HUM111          
                                </td>
                                    <td title="Theory Only Scheme Course">
                                        Pakistan Studies
                                    </td>
                                <td>
                                    3
                                </td>
                                <td>
                                    Tooba Sami Ahmad
                                </td>
                                <td>

                                    BSE 5 FA18-BSE-A A
                                </td>
                                <td>
                                            <div id="bar_49799-Class" title="Class Attendance" class="only_class_attendance" aria-valuenow="87" aria-valuemin="0" aria-valuemax="87"></div>
                                            <script>
                                                $('#bar_49799-Class').progressBarTimer({ _percentage: 87, autoStart: true, timeLimit: 1, label: { show: true, type: 'percent' } });
                                            </script>

                                </td>
                            </tr>
                    </tbody>
                </table>
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

</html>`, rules));

/**
 * if its single node and node has id
 *    name will be node_id
 */

/**
 * {
 *   "heads": {
 *     "_meta": {
 *       "test": 1234
 *     }
 *     "scripts": 12,
 *   },
 *   ""
 * }
 */
