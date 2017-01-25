angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope,$filter,$location, $ionicModal, $timeout,$state,$rootScope,$ionicPopup, $ionicSideMenuDelegate,webService) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});
// $scope.cartitemno=JSON.parse(window.localStorage.getItem("remlogin")).length;

//theme color 00adef



$rootScope.loggedinphoneno=window.localStorage.getItem("phone_no");
$rootScope.alradyaddress=false;
$rootScope.checkoutdataindex='';
$rootScope.ifcheckout=false;
$scope.user={};
$scope.addressdetails={};
//$rootScope.addressdetailssummary={};
$scope.order={};
$scope.order.cost=350;
$scope.cost=350;

$scope.order.quantity=1;

$scope.organizations = ['1', '2', '3', '4', '5'];
    $scope.order.quantity = $scope.organizations[0];

$scope.pricecalculate= function() {

$scope.order.cost=$scope.order.quantity*$scope.cost;
 

}

$scope.gotodashboard= function() {

  $location.url('/app/browse');
 

}

$scope.ordersummary= function() {

console.log($rootScope.sendorderdetailss)
$rootScope.sendorderdetailssutuyuy=$rootScope.sendorderdetailss;
$rootScope.addressdetailssummary=
{
"Mobile":$rootScope.loggedinphoneno,
"Name":$scope.addressdetails.name,
"Email":$scope.addressdetails.email,
"Address":$scope.addressdetails.address,
"City":$scope.addressdetails.city,
"Pincode":$scope.addressdetails.pincode,
"Area":$scope.addressdetails.area
};

console.log($rootScope.addressdetailssummary)
  $location.url('/app/ordersummary');
 
}

$scope.paymentmethod= function() {

  $location.url('/app/paymentoption');
 
}

$scope.myorderbutton= function() {

  $location.url('/app/myorders');
 

}



$scope.acservices= function() {

  $location.url('/app/browse');

}

$scope.sendorderdetailsinit= function(){

$scope.order.type='';

$scope.order.frequency='';

$scope.order.time='';
$scope.order.date='';
$scope.order.comment='';

}

 $scope.prepareorder = function(){

console.log($scope.order.date)

var q = new Date();
var m = q.getMonth();
var d = q.getDate();
var y = q.getFullYear();

var date = new Date(y,m,d);

mydate=new Date($scope.order.date);

        var msg ='';

 if($scope.order.type ==''){
      msg = "Please Select Type!"; 
   
     }
     else if($scope.order.frequency=='' ){
     msg = "Please Select Frequency "; 
   }else if($scope.order.date=='' ){
     msg = "Please select Date!"; 
   }
   else if($scope.order.date!='' && mydate<date ){
     msg = "Please select valid Date!"; 
   }else if($scope.order.time=='' ){
     msg = "Please Select Time"; 
   }


    if(msg!=''){
        webService.showPopup(msg, $rootScope.title_ok);
                         webService.hideIonLoader();  //show ionic loading
       
    }else{
 
//2014 like
$rootScope.sendorderdetailss=[{
"Mobile":"$rootScope.loggedinphoneno",
"Mode":"1",
"Status":"F",
"Type":$scope.order.type,
"Quantity":$scope.order.quantity,
"FREEQUENCY":$scope.order.frequency,
"Cost":$scope.cost,
"Total_cost":$scope.order.cost,
"Time":$scope.order.time,
"Date":$filter('date')($scope.order.date,'yyyy-MM-dd'),
"Comment":$scope.order.comment,
}];






 $location.url('/app/search');
}

}



//for confirm order


 $scope.sendorder = function(){
    

 console.log($rootScope.sendorderdetailss);
      var dataJson =JSON.stringify($rootScope.sendorderdetailss).replace("[","").replace("]"," ");
       console.log($rootScope.sendorderdetailss);
    //  $rootScope.sendorderdetailssutuyuy=$rootScope.sendorderdetailss;
var methodType = 'POST'
  var urlParam = 'OrderNow/BookOrder.svc/SetOrder';

      webService.webCall(urlParam,methodType,dataJson)
         .then(function(respone){
          console.log(respone);
             webService.hideIonLoader(); 
             
webService.showPopup("order completed succesfully", $rootScope.title_close).then(function(res){
          $location.url('/app/orderco');
          $scope.removecartt($rootScope.checkoutdataindex);

                   });
             // if($scope.params.bpId !=''){
                
             //    if(respone.data.ModifyBPResult.Success){
             //      webService.showPopup(respone.data.ModifyBPResult.ErrorMsg, $rootScope.title_close).then(function(res){
             //          $state.go('bp.bpDetail',{bpId:$scope.params.bpId})
             //       });
             //     }else{
             //        webService.showPopup(respone.data.ModifyBPResult.ErrorMsg, $rootScope.title_close);
             //     }

             // }else{
             //    if(respone.data.BPSetResult.Success){
             //      webService.showPopup(respone.data.BPSetResult.ErrorMsg, $rootScope.title_close).then(function(res){
             //          $state.go('bp.bpDetail',{bpId:$scope.bpModel.BP_Code})
             //       });
             //     }else{
             //        webService.showPopup(respone.data.BPSetResult.ErrorMsg, $rootScope.title_close);
             //     }
             // }            
             

             
         
         },function(error){
            webService.hideIonLoader();  //show ionic loading
            webService.showPopup('Webservice response error!', $rootScope.title_close);
         });



}


$scope.mylocalcart=$rootScope.checkcartdata;
$scope.addtocart= function() {

 webService.showIonLoader();
        var msg ='';

 if($scope.order.type ==''){
      msg = "Please Select Type!"; 
   
     }
     else if($scope.order.frequency=='' ){
     msg = "Please Select Frequency "; 
   }else if($scope.order.date=='' ){
     msg = "Please select Date!"; 
   }else if($scope.order.time=='' ){
     msg = "Please Select Time"; 
   }


    if(msg!=''){
        webService.showPopup(msg, $rootScope.title_ok);
                         webService.hideIonLoader();  //show ionic loading
       
    }else{


$scope.forpush={
"Mobile":"$rootScope.loggedinphoneno",
"Mode":"1",
"Status":"F",
"Type":$scope.order.type,
"Quantity":$scope.order.quantity,
"FREEQUENCY":$scope.order.frequency,
"Cost":$scope.cost,
"Total_cost":$scope.order.cost,
"Time":$scope.order.time,
"Date":$filter('date')($scope.order.date,'yyyy-MM-dd'),
"Comment":$scope.order.comment,
};



      


  $scope.mylocalcart.push($scope.forpush);
  // $location.url('/app/search');
window.localStorage.setItem("remlogin", JSON.stringify($scope.mylocalcart));

$rootScope.cartitemno=JSON.parse(window.localStorage.getItem("remlogin")).length;
// $scope.cartitem=JSON.parse(window.localStorage.getItem("remlogin"));
$scope.sendorderdetailsinit();
 webService.hideIonLoader(); 
webService.showPopup("Order added in cart succesfully", $rootScope.title_ok);

}
}
// $scope.cartitem={};


   
$scope.sendotp= function() {

  $location.url('/app/playlist');

}


$scope.rdate = new Date();

  $scope.tabClass= '';

 $scope.pr=true;
  $scope.divshow = function(id,tab){

   
    $("#"+tab).addClass("active");
   if (id=='pr') {
      $scope.si=false;
      $scope.pr=true;
        $scope.tabClass= 'active';
       $scope.th=false;
       $("#tab2,#tab3").removeClass("active");
   }else if (id=='si')
   {
     $scope.si=true;
      $scope.pr=false;
       $scope.th=false;
         $("#tab1,#tab3").removeClass("active");
   }else 
   {
     $scope.si=false;
      $scope.pr=false;
       $scope.th=true;
         $("#tab2,#tab1").removeClass("active");
   }
  

  }


 $scope.openCity =function( cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    // evt.currentTarget.className += " active";
}






 $scope.adduseraddressinit = function(){ 

$scope.addressdetails.name='';
$scope.addressdetails.email='';
$scope.addressdetails.address='';
$scope.addressdetails.city='';
$scope.addressdetails.pincode='';
$scope.addressdetails.area='';

}

$rootScope.addressdetailssummary={};
 
 $scope.adduseraddress = function(){
    

  
   // $scope.ordersummary();  

        var msg ='';

 if($scope.addressdetails.name ==''){
      msg = "Please enter your name !"; 
   
     }else if($scope.addressdetails.name !='' && $scope.addressdetails.name.length < 6  ){
     msg = "Name should be more than 6 Character !"; 
   }
     else if($scope.addressdetails.email=='' ){
     msg = "Please enter your email !"; 
   }
   else if($scope.addressdetails.email!='' && !webService.ValidateEmail($scope.addressdetails.email)){
       msg = 'Please enter correct email!';
      
    } else if($scope.addressdetails.city=='' ){
     msg = "Please enter your city!"; 
   }else if($scope.addressdetails.address=='' ){
     msg = "Please enter your address!"; 
   }else if($scope.addressdetails.pincode=='' ){
     msg = "Please enter your pincode!"; 
   }else if($scope.addressdetails.area=='' ){
     msg = "Please enter your area!"; 
   }



    if(msg!=''){
        webService.showPopup(msg, $rootScope.title_ok);
                         webService.hideIonLoader();  //show ionic loading
       
    }else{
 
      var dataJson =JSON.stringify(
{
"Mobile":$rootScope.loggedinphoneno,
"Name":$scope.addressdetails.name,
"Email":$scope.addressdetails.email,
"Address":$scope.addressdetails.address,
"City":$scope.addressdetails.city,
"Pincode":$scope.addressdetails.pincode,
"Area":$scope.addressdetails.area,
    "GPRS_ADDRESS":"cgghcghchg"
});
      if($rootScope.alradyaddress){
        var methodType = 'PUT'
  var urlParam = 'SignUP/UserSignUP.svc/ModifySignUPInfo';

      }else{

        var methodType = 'POST'
  var urlParam = 'SignUP/UserSignUP.svc/SetSignUPInfo';
      }


      webService.webCall(urlParam,methodType,dataJson)
         .then(function(respone){
     console.log(respone)

        
   
  console.log($rootScope.addressdetailssummary)
             webService.hideIonLoader(); 
             $scope.ordersummary(); 

     


             
             
// webService.showPopup("order completed succesfully", $rootScope.title_close).then(function(res){
//           $location.url('/app/orderco');
          // $scope.removecartt($rootScope.checkoutdataindex);

                   // });
                           // if($scope.params.bpId !=''){
                
             //    if(respone.data.ModifyBPResult.Success){
             //      webService.showPopup(respone.data.ModifyBPResult.ErrorMsg, $rootScope.title_close).then(function(res){
             //          $state.go('bp.bpDetail',{bpId:$scope.params.bpId})
             //       });
             //     }else{
             //        webService.showPopup(respone.data.ModifyBPResult.ErrorMsg, $rootScope.title_close);
             //     }

             // }else{
             //    if(respone.data.BPSetResult.Success){
             //      webService.showPopup(respone.data.BPSetResult.ErrorMsg, $rootScope.title_close).then(function(res){
             //          $state.go('bp.bpDetail',{bpId:$scope.bpModel.BP_Code})
             //       });
             //     }else{
             //        webService.showPopup(respone.data.BPSetResult.ErrorMsg, $rootScope.title_close);
             //     }
             // }            
             

             
         
         },function(error){
            webService.hideIonLoader();  //show ionic loading
            webService.showPopup('Webservice response error!', $rootScope.title_close);
         });

}

}

 
 //send otp 

 



  $scope.getmyorders = function(){

 webService.showIonLoader();  
 

    var urlParam = 'CustomerOrderStatus/CustomerOrder.svc/getorderstatus/'+$rootScope.loggedinphoneno+'/p';
    var methodType = 'GET'
    var dataJson = JSON.stringify({});   
 
 

      webService.webCall(urlParam,methodType,dataJson)
         .then(function(respone){
            webService.hideIonLoader();//hide ionic loading
          
           $scope.GetOrderStatusResult=respone.data.GetOrderStatusResult.Result;
             
         
         },function(error){
            webService.hideIonLoader();  //show ionic loading
            webService.showPopup('Check your internet connection', $rootScope.title_close);
         });


       
}

 $scope.checklogin = function(phone_no){
  
     var urlParam = 'LoginService/UserLoginService.svc/UserLogin/'+phone_no;
           

    var methodType = 'GET'
    var dataJson = JSON.stringify({});   
 
 

      webService.webCall(urlParam,methodType,dataJson)
         .then(function(respone){
          console.log(respone);
             webService.hideIonLoader(); 
             
                    if(respone.data.LoginUserResult.LoginMessage.Success){
$rootScope.alradyaddress=true;

$scope.addressdetails = {'city':respone.data.LoginUserResult.UserDetails.City,'email':respone.data.LoginUserResult.UserDetails.Email,
'name':respone.data.LoginUserResult.UserDetails.UserName,
'address':respone.data.LoginUserResult.UserDetails.Address,
'pincode':respone.data.LoginUserResult.UserDetails.Pin,
'area':respone.data.LoginUserResult.UserDetails.Area};
    $scope.getarea(respone.data.LoginUserResult.UserDetails.Pin);

                    }
                    

                      // respone.data.LoginUserResult.UserDetails.Address
                      // respone.data.LoginUserResult.UserDetails.Address
                      // respone.data.LoginUserResult.UserDetails.Address
                      // respone.data.LoginUserResult.UserDetails.Address
                      // respone.data.LoginUserResult.UserDetails.Address
                      // respone.data.LoginUserResult.UserDetails.Address

             

             
         
         },function(error){
            webService.hideIonLoader();  //show ionic loading
            webService.showPopup('Webservice response error!', $rootScope.title_close);
         });
}

 $scope.sendotptophone = function(){

 webService.showIonLoader();  
    var msg ='';
    

    if($scope.user.userphoneno == '' || $scope.user.userphoneno === undefined ){

      msg = "Please Enter Phone Number";
      
    
    }else if($scope.user.userphoneno !='' && !webService.Phonevaliate($scope.user.userphoneno)){
       msg = 'Please Enter Valid  Phone Number !';
       
    }


 if(msg!=''){
     

  webService.showPopup(msg, $rootScope.title_ok);
        
     webService.hideIonLoader();//hide ionic loading
  }else {

    var urlParam = 'OTPService/GetOTP.svc/GetOTP/'+$scope.user.userphoneno;
    var methodType = 'GET'
    var dataJson = JSON.stringify({});   
 
 

      webService.webCall(urlParam,methodType,dataJson)
         .then(function(respone){
        
          console.log(respone)
            webService.hideIonLoader();//hide ionic loading
          
          angular.forEach(respone.data.GetOTPPassResult.Result, function(item, key) {
  
          window.localStorage.setItem("phone_no",item.MobileNo)
           $rootScope.responseotp=item.OTPPassword;

           
               $rootScope.loggedinphoneno=window.localStorage.getItem("phone_no");
               $rootScope.sendorderdetailss[0].Mobile=$rootScope.loggedinphoneno;
           

});
          $location.url('/app/playlist');
             webService.hideIonLoader(); 
             
             
         
         },function(error){
            webService.hideIonLoader();  //show ionic loading
            webService.showPopup('Check your internet connection', $rootScope.title_close);
         });


       }
}

//get city 
 $scope.getcity = function(){

 webService.showIonLoader();  
 

    var urlParam = 'GetAreaService/GetArea.svc/GetCity';
    var methodType = 'GET'
    var dataJson = JSON.stringify({});   
 
 

      webService.webCall(urlParam,methodType,dataJson)
         .then(function(respone){
            webService.hideIonLoader();//hide ionic loading
          
           $scope.usercity=respone.data.GetCityResult.Result;
             
           $scope.checklogin($rootScope.loggedinphoneno);
         },function(error){
            webService.hideIonLoader();  //show ionic loading
            webService.showPopup('Check your internet connection', $rootScope.title_close);
         });


       
}



//get area 
 $scope.getarea = function(pin){
 
 webService.showIonLoader();  
 

    var urlParam = 'GetAreaService/GetArea.svc/GetAreaName/'+pin;
    var methodType = 'GET'
    var dataJson = JSON.stringify({});   
 
 

      webService.webCall(urlParam,methodType,dataJson)
         .then(function(respone){
            webService.hideIonLoader();//hide ionic loading
          
          if(respone.data.GetAreaNameResult.Messsage.Success){
 $scope.userarea=respone.data.GetAreaNameResult.Result;
          }else{
             webService.showPopup('Service not available in your area', $rootScope.title_ok);
          }
          
        
            
         
         },function(error){
            webService.hideIonLoader();  //show ionic loading
            webService.showPopup('Check your internet connection', $rootScope.title_close);
         });


       
}




// $scope.addressdetails.city = $scope.usercity['City'][0];


 $scope.checkotp = function(){

if($scope.user.enterotp==$rootScope.responseotp){

  // webService.showPopup('correct', $rootScope.title_close);
    $location.url('/app/userdata');

}else{

 webService.showPopup('Enter Valid OTP', $rootScope.title_close);
}

 }

 $scope.cartbedgeshow= false;
  $scope.showbedge = function(){

 $scope.cartbedgeshow= true;

 }


//for check login 
$scope.showPopup = function() {
  $scope.data333 = {};

  // An elaborate, custom popup
  var myPopup = $ionicPopup.show({
    template: '<input type="password" ng-model="data333.wifi">',
    title: 'Enter Wi-Fi Password',
    subTitle: 'Please use normal things',
    scope: $scope,
    buttons: [
      { text: 'Cancel' },
      {
        text: '<b>Save</b>',
        type: 'button-positive',
        onTap: function(e) {
          if (!$scope.data333.wifi) {
            //don't allow the user to close unless he enters wifi password
            e.preventDefault();
          } else {
            return $scope.data333.wifi;
          }
        }
      }
    ]
  });

  myPopup.then(function(res) {
    console.log('Tapped!', res);
  });

 
 };


//remove from cart 

var cartitemdata;

 

 $scope.removecart = function($event,index){



cartitemdata=JSON.parse(window.localStorage.getItem("remlogin"));

 webService.showPopup("Order Removed From Cart succesfully", $rootScope.title_ok);
        cartitemdata.splice(index,1);

 window.localStorage.setItem("remlogin", JSON.stringify(cartitemdata));
   $scope.cartitem=JSON.parse(window.localStorage.getItem("remlogin"));
  $rootScope.cartitemno=JSON.parse(window.localStorage.getItem("remlogin")).length;
    };

     $scope.removecartt = function(index){

cartitemdata=JSON.parse(window.localStorage.getItem("remlogin"));


        cartitemdata.splice(index,1);

 window.localStorage.setItem("remlogin", JSON.stringify(cartitemdata));
   $scope.cartitem=JSON.parse(window.localStorage.getItem("remlogin"));
  $rootScope.cartitemno=JSON.parse(window.localStorage.getItem("remlogin")).length;
    };


 $scope.checkout = function($event,index){



cartitemdata=JSON.parse(window.localStorage.getItem("remlogin"));
$rootScope.ifcheckout=true;
$rootScope.checkoutdataindex=index;
$rootScope.sendorderdetailss=[cartitemdata[index]];
 $location.url('/app/search');

    };

     $scope.getCurrentPositionlocation = function($event,index){

   
     navigator.geolocation.getCurrentPosition(onSuccess, onError);
    
    

   }
   
function onError(error) {
        alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
    }

       var onSuccess = function(position) {
        alert('Latitude: '          + position.coords.latitude          + '\n' +
              'Longitude: '         + position.coords.longitude         + '\n' +
              'Altitude: '          + position.coords.altitude          + '\n' +
              'Accuracy: '          + position.coords.accuracy          + '\n' +
              'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
              'Heading: '           + position.coords.heading           + '\n' +
              'Speed: '             + position.coords.speed             + '\n' +
              'Timestamp: '         + position.timestamp                + '\n');
    };


 // On Before Enter event
   $scope.$on('$ionicView.beforeEnter', function() {
         // $scope.getcity();
         $scope.sendorderdetailsinit();
           
          $scope.adduseraddressinit();
        
//           if(($rootScope.cartitemno === undefined || $rootScope.cartitemno ==0 )){ 
// $rootScope.cartitemno=0;
// }else{
//   $scope.cartitem=JSON.parse(window.localStorage.getItem("remlogin"));
//   $rootScope.cartitemno=JSON.parse(window.localStorage.getItem("remlogin")).length;

// }
   if (($.inArray($state.current.name, ['app.userdata']) !== -1 )) {

       $scope.getcity();

        }
        if (($.inArray($state.current.name, ['app.myorders']) !== -1 )) {
$scope.getmyorders();

        }
  
     
    });






})


.controller('menucontroller', function($scope,$filter,$location, $ionicModal, $timeout,$state,$rootScope,$ionicPopup, $ionicSideMenuDelegate,webService) {

$scope.mycartitem= function() {
$scope.cartitem=JSON.parse(window.localStorage.getItem("remlogin"));
  $location.url('/app/mycart');

}
console.log("cart"+$rootScope.cartitemno);

console.log("cart2"+window.localStorage.getItem("remlogin"));
if(($rootScope.cartitemno === undefined && window.localStorage.getItem("remlogin") ==null  )){ 
$rootScope.cartitemno=0;
$rootScope.checkcartdata=[];
}else{
  $rootScope.checkcartdata=JSON.parse(window.localStorage.getItem("remlogin"));
  $scope.cartitem=JSON.parse(window.localStorage.getItem("remlogin"));
  $rootScope.cartitemno=JSON.parse(window.localStorage.getItem("remlogin")).length;

}

})
