$('#nav-home').on('click',() =>  {
    /*$('#customer-section').css({display: 'block'});
    $('#item-section').css({display: 'none'});
    $('#order-section').css({display: 'none'});
    $('#order-details-section').css({display: 'none'});*/


    $("#header-section").css('display','block')
    $("#dashboard-section").css('display','block')
    $("#login-section").css('display','none')
    $("#signup-section").css('display','none')
    $("#field-section").css('display','none')
    $("#crop-section").css('display','none')
    $("#log-section").css('display','none')
    $("#staff-section").css('display','none')
    $("#equipment-section").css('display','none')
    $("#vehicle-section").css('display','none')
});

$('#nav-field').on('click',() =>  {

    $("#header-section").css('display','block')
    $("#dashboard-section").css('display','none')
    $("#login-section").css('display','none')
    $("#signup-section").css('display','none')
    $("#field-section").css('display','block')
    $("#crop-section").css('display','none')
    $("#log-section").css('display','none')
    $("#staff-section").css('display','none')
    $("#equipment-section").css('display','none')
    $("#vehicle-section").css('display','none')
});

$('#nav-crop').on('click',() =>  {

    $("#header-section").css('display','block')
    $("#dashboard-section").css('display','none')
    $("#login-section").css('display','none')
    $("#signup-section").css('display','none')
    $("#field-section").css('display','none')
    $("#crop-section").css('display','block')
    $("#log-section").css('display','none')
    $("#staff-section").css('display','none')
    $("#equipment-section").css('display','none')
    $("#vehicle-section").css('display','none')
});

$('#nav-log').on('click',() =>  {

    $("#header-section").css('display','block')
    $("#dashboard-section").css('display','none')
    $("#login-section").css('display','none')
    $("#signup-section").css('display','none')
    $("#field-section").css('display','none')
    $("#crop-section").css('display','none')
    $("#log-section").css('display','block')
    $("#staff-section").css('display','none')
    $("#equipment-section").css('display','none')
    $("#vehicle-section").css('display','none')
});

$('#nav-staff').on('click',() =>  {

    $("#header-section").css('display','block')
    $("#dashboard-section").css('display','none')
    $("#login-section").css('display','none')
    $("#signup-section").css('display','none')
    $("#field-section").css('display','none')
    $("#crop-section").css('display','none')
    $("#log-section").css('display','none')
    $("#staff-section").css('display','block')
    $("#equipment-section").css('display','none')
    $("#vehicle-section").css('display','none')
});

$('#nav-equipment').on('click',() =>  {

    $("#header-section").css('display','block')
    $("#dashboard-section").css('display','none')
    $("#login-section").css('display','none')
    $("#signup-section").css('display','none')
    $("#field-section").css('display','none')
    $("#crop-section").css('display','none')
    $("#log-section").css('display','none')
    $("#staff-section").css('display','none')
    $("#equipment-section").css('display','block')
    $("#vehicle-section").css('display','none')
});

$('#nav-vehicle').on('click',() =>  {

    $("#header-section").css('display','block')
    $("#dashboard-section").css('display','none')
    $("#login-section").css('display','none')
    $("#signup-section").css('display','none')
    $("#field-section").css('display','none')
    $("#crop-section").css('display','none')
    $("#log-section").css('display','none')
    $("#staff-section").css('display','none')
    $("#equipment-section").css('display','none')
    $("#vehicle-section").css('display','block')
});