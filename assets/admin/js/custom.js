/**
 *
 * You can write your JS code here, DO NOT touch the default style file
 * because it will make it harder for you to update.
 *
 */
 "use strict";
    function notify(type,message) { 
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            onOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
        })
        Toast.fire({
            icon: type,
            title: message
        })
    }

    (function($) {
        "use strict"; // Start of use strict

       
        $('.hide-close').on('click',function () { 
            $(this).parent().remove()
        })

        // Toggle the side navigation
        $("#sidebarToggle, #sidebarToggleTop").on('click', function(e) {
            $("body").toggleClass("sidebar-toggled");
            $(".sidebar").toggleClass("toggled");
            if ($(".sidebar").hasClass("toggled")) {
                $('.sidebar .collapse').collapse('hide');
            };
        });

        $("#wrapper .sidebar a").each(function() {
            var pageUrl = window.location.href.split(/[#]/)[0];
            if (this.href == pageUrl) {
                if ($(this).parent().hasClass('collapse-inner')) {
                    $(this).addClass("active"); // add active to li of the current link
                    $(this).parent().parent().parent().addClass("active");
                    $(this).parent().parent().prev().click();
                } else {
                    $(this).parent().addClass("active"); // add active to li of the current link
                }
            }
        });


        // Close any open menu accordions when window is resized below 768px
        $(window).resize(function() {
            if ($(window).width() < 768) {
                $('.sidebar .collapse').collapse('hide');
            };
        });

        // Prevent the content wrapper from scrolling when the fixed side navigation hovered over
        $('body.fixed-nav .sidebar').on('mousewheel DOMMouseScroll wheel', function(e) {
            if ($(window).width() > 768) {
                var e0 = e.originalEvent,
                    delta = e0.wheelDelta || -e0.detail;
                this.scrollTop += (delta < 0 ? 1 : -1) * 30;
                e.preventDefault();
            }
        });

        // Scroll to top button appear
        $(document).on('scroll', function() {
            var scrollDistance = $(this).scrollTop();
            if (scrollDistance > 100) {
                $('.scroll-to-top').fadeIn();
            } else {
                $('.scroll-to-top').fadeOut();
            }
        });

        // Smooth scrolling using jQuery easing
        $(document).on('click', 'a.scroll-to-top', function(e) {
            var $anchor = $(this);
            $('html, body').stop().animate({
                scrollTop: ($($anchor.attr('href')).offset().top)
            }, 1000, 'easeInOutExpo');
            e.preventDefault();
        });

        // IMAGE UPLOADING :)
        $(document).on('change', '.image', function(event) {
            var file = event.target.files[0];
            var target = $(this).attr('data-target');
            var path = $('#image' + target);
            var reader = new FileReader();
            reader.onload = function(e) {
                path.attr('src', e.target.result);

            };
            reader.readAsDataURL(file);
        })


        // IMAGE UPLOADING ENDS :)

       

        // POPUP MODAL
        $('.confirm-modal').on('show.bs.modal', function(e) {
            $(this).find('.btn-ok').attr('href', $(e.relatedTarget).data('href'));
        });

        $('.confirm-modal .btn-ok').on('click', function(e) {

            if (admin_loader == 1) {
                $('.submit-loader').show();
            }

            $.ajax({
                type: "GET",
                url: $(this).attr('href'),
                success: function(data) {
                    $('.confirm-modal').modal('hide');
                    table.ajax.reload();
                    $('.alert-danger').hide();
                    $('.alert-success').show();
                    $('.alert-success p').html(data);

                    if (admin_loader == 1) {
                        $('.submit-loader').hide();
                    }
                }
            });
            return false;
        });

        // POPUP MODAL ENDS


        // STATUS SECTION

        $(document).on('click', '.StatusCheck', function() {
            var link = $(this).attr('data-href');
            $.get(link, function(data) {
                $('#geniustable').DataTable().ajax.reload();
                $('.alert-success').show();
                $('.alert-success p').html(data);
            });
        });
        // STATUS SECTION ENDS


        // Delete Operation ------------------------------------------//

        $('#confirm-delete').on('show.bs.modal', function(e) {
            $(this).find('#remove__data').attr('action', $(e.relatedTarget).data('href'));
        });

        $(document).on('submit', '#remove__data', function(e) {

            $.ajax({
                type: "DELETE",
                url: $(this).attr('action'),
                data: new FormData(this),
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                contentType: false,
                cache: false,
                processData: false,
                success: function(data) {
                    $('#confirm-delete').modal('toggle');
                    $('#geniustable').DataTable().ajax.reload();
                    $('.alert-danger').hide();
                    $('.alert-success').show();
                    $('.alert-success p').html(data);
                }
            });
            return false;
        });


        // Delete Operation End ------------------------------------------//



        // All Image Reader -----------------------------//

        $(document).on('change', '.image,#image', function() {
            var file = event.target.files[0];
            var reader = new FileReader();
            reader.onload = function(e) {
                // console.log(e.target.result)
                $('.ShowImage').removeClass('d-none');
                $('.ShowImage img').attr('src', e.target.result);
            };
            reader.readAsDataURL(file);
        })
        // All Image Reader -----------------------------//

        // meta tags js
  

        $(document).on('click', '#seo', function() {
            if ($(this).is(':checked')) {
                $('.showbox').removeClass('d-none');
            } else {
                $('.showbox').addClass('d-none');
            }
        });
        $('.cp').colorpicker({
            format: 'auto'
          });
        $(document).ready(function () {
           
            if ($('#seo').is(':checked')) {
                $('.showbox').removeClass('d-none');
            } else {
                $('.showbox').addClass('d-none');
            }
        });


        $(document).on('click', '.gs-status-check', function() {
            
            var status = $(this).parent().prev();
            var validation = $(this).parent().parent().prev();

            var link = $(this).attr('data-href');
            $.get(link, function(data) {
                
                if (data.status == 1) {
                    status.html(lang.active).addClass('btn-success').removeClass('btn-danger');
                   
                } else {
                    status.html(lang.deactive).addClass('btn-danger').removeClass('btn-success');
                    
                }

                if (validation.html()) {
                    validation.find('.alert-danger').hide();
                    validation.find('.alert-success').show();
                    validation.find('.alert-success p').html(data.success);
                    
                } else {
                    $('.alert-danger').hide();
                    $('.alert-success').show();
                    $('.alert-success p').html(data.success);
                }
                notify('success',data.success)

            });
        });


        $(document).on('submit',"#forgotform",function(e){
            e.preventDefault();
            $('button.submit-btn').prop('disabled',true);
            $('.alert-info').show();
            $('.alert-info p').html($('#authdata').val());
                $.ajax({
                 method:"POST",
                 url:$(this).prop('action'),
                 data:new FormData(this),
                 dataType:'JSON',
                 contentType: false,
                 cache: false,
                 processData: false,
                 success:function(data)
                 {
                    if ((data.errors)) {
                    $('.alert-success').hide();
                    $('.alert-info').hide();
                    $('.alert-danger').show();
                    $('.alert-danger ul').html('');
                      for(var error in data.errors)
                      {
                        $('.alert-danger p').html(data.errors[error]);
                      }
                    }
                    else
                    {
                      $('.alert-info').hide();
                      $('.alert-danger').hide();
                      $('.alert-success').show();
                      $('.alert-success p').html('Success !');
                    }
                    $('button.submit-btn').prop('disabled',false);
                 }
          
                });
          
        });
          
        
        
        $(document).on('submit',"#loginform",function(e){
            e.preventDefault();
            $('button.submit-btn').prop('disabled',true);
            $('.alert-info').show();
            $('.alert-info p').html($('#authdata').val());
                $.ajax({
                 method:"POST",
                 url:$(this).prop('action'),
                 data:new FormData(this),
                 dataType:'JSON',
                 contentType: false,
                 cache: false,
                 processData: false,
                 success:function(data)
                 {
                    if ((data.errors)) {
                    $('.alert-success').hide();
                    $('.alert-info').hide();
                    $('.alert-danger').show();
                    $('.alert-danger ul').html('');
                      for(var error in data.errors)
                      {
                        $('.alert-danger p').html(data.errors[error]);
                      }
                    }
                    else
                    {
                      $('.alert-info').hide();
                      $('.alert-danger').hide();
                      $('.alert-success').show();
                      $('.alert-success p').html('Success !');
                      window.location = data;
                    }
                    $('button.submit-btn').prop('disabled',false);
                 }
          
                });
          
          });

    })(jQuery); // End of use strict

    // Modal Javascript

    $(document).ready(function() {

        $("#myBtn").click(function() {
            $('.modal').modal('show');
        });

        $("#modalLong").click(function() {
            $('.modal').modal('show');
        });

        $("#modalScroll").click(function() {
            $('.modal').modal('show');
        });

        $('#modalCenter').click(function() {
            $('.modal').modal('show');
        });

    });

    // Popover Javascript

    $(function() {
        $('[data-toggle="popover"]').popover()
    });

    $('.popover-dismiss').popover({
        trigger: 'focus'
    });

    function shownotification() {
        $("#notclear").html('0');
        $route = $("#notclear").data("href");
        $.get($route);
        $('#notf-show').load($('#notf-show').data('href'));
    }

    $(document).on('click', '#clear-notf', function() {
        $.get($(this).data('href'));
    });

    // Status Start
    $(document).on('click', '.status', function() {
        var link = $(this).attr('data-href');
        $.get(link, function() {}).done(function(data) {
            table.ajax.reload();
            $('.alert-danger').hide();
            $('.alert-success').show();
            $('.alert-success p').html(data);
        })
    });
    // Status Ends



    // FORM SUBMIT AJAX 
    $(document).on('submit', '#geniusform,#geniusformUpdate', function(e) {

        var $this = $(this);

        e.preventDefault();
       

        $('#submit-btn').prop('disabled', true);
    
        $.ajax({
            method: "POST",
            url: $(this).prop('action'),
            data: new FormData(this),
            contentType: false,
            cache: false,
            processData: false,
            success: function(data) {

                if ((data.errors)) {
                    $this.find('.alert-success').hide();
                    $this.find('.alert-danger').show();
                    $this.find('.alert-danger ul').html('');
                    for (var error in data.errors) {
                        $this.find('.alert-danger ul').append('<li>' + data.errors[error] + '</li>')
                        notify('error',data.errors[error])
                    }
                } else {
                    $this.find('.alert-danger').hide();
                    $this.find('.alert-success').show();
                    $this.find('.alert-success p').html(data);
                    if ($this.attr('id') != 'geniusformUpdate') {
                        $('#geniusform')[0].reset();
                    }
                    notify('success',data)
                }
                if (admin_loader == 1) {
                    $('.gocover').hide();
                }
                $('#submit-btn').prop('disabled', false);
                $(window).scrollTop(0);
                
            }

        });

    });


    // FORM SUBMIT AJAX 

    // Status Start
    $(document).on('click', '.status', function() {
        var link = $(this).attr('data-href');
        $.get(link, function() {}).done(function(data) {
            $('#geniustable').DataTable().ajax.reload();
            $('.alert-danger').hide();
            $('.alert-success').show();
            $('.alert-success p').html(data);
        })
    });
    // Status Ends



    $('.icon-picker').iconpicker();

    // EMAIL CHECK JS START
    $(document).on('change', '#mail_type', function() {
        let is_type = $(this).val();
        if (is_type == 'php_mail') {
            $('.smtp__check').addClass('d-none');
        } else {
            $('.smtp__check').removeClass('d-none');
        }
    })
    // EMAIL CHECK JS END


    // LANGUAGE JS START


    function isEmpty(el) {
        return !$.trim(el.html())
    }

   


    $(document).on('click', '.remove-btn', function() {

        $(this.parentNode).remove();
        if (isEmpty($('#language-section'))) {
            $("#language-section").append(
                ` <div class="language-area  position-relative">
            <span class="remove-btn"><i class="fas fa-times"></i></span>
            <div class="row">
                <div class="col-sm-6 col-md-6 col-6">
                    <div class="form-group ">
                        <textarea name="keys[]" class="form-control" placeholder="Enter Language Key" required=""></textarea>
                    </div>
                </div>
                <div class="col-sm-6 col-md-6 col-6">
                    
                    <div class="form-group ">
                        <textarea name="values[]" class="form-control" placeholder="Enter Language Value" required=""></textarea>
                    </div>
                </div>
            </div>
        </div>`
            );
        }
    });
    // LANGUAGE JS END



    $(document).on('click','.addToMenu',function(){
        let $this = $(this);
        let title = $this.data('title');
        let keyword = title.replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, '-');
        let dropdown = $this.data('dropdown');
        let href = $this.data('href');
        let target = $this.data('target');
    
        $('#section-list').append(`
            <div class="card mb-0 mt-2 mx-2 draggable-item">
                <div class="card-body">
                    <div class="media">
                        <div class="media-body">
                            <h5 class="mb-1 mt-0">${title}</h5>
                            <input type="hidden" name="${keyword}[title]" value="${title}">
                            <input type="hidden" name="${keyword}[dropdown]" value="${dropdown}">
                            <input type="hidden" name="${keyword}[href]" value="${href}">
                            <input type="hidden" name="${keyword}[target]" value="${target}">
                        </div>
                        <i class="remove-menu fa fa-trash-alt"></i>
                    </div>
                </div>
            </div>
        `);
    
    });
    
    $(document).on('click','#custom-submit',function(){
        
        let title = $('#title').val();
        let href = $('#url').val();
        let type = $('#type').val();
        if(/^(http|https|ftp):\/\/[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i.test(href)){
            href = href;
            $('.show__url__validation').hide();
        } else {
            $('.show__url__validation').show();
            return true;
        }
        if(title != ''){
            let keyword = title.replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, '-');
            let dropdown = 'no';
            
            let target = $('#target').val();
    
            $('#section-list').append(`
                <div class="card mb-0 mt-2 mx-2 draggable-item">
                    <div class="card-body">
                        <div class="media">
                            <div class="media-body">
                                <h5 class="mb-1 mt-0">${title}</h5>
                                <input type="hidden" name="${keyword}[title]" value="${title}">
                                <input type="hidden" name="${keyword}[dropdown]" value="${dropdown}">
                                <input type="hidden" name="${keyword}[href]" value="${href}">
                                <input type="hidden" name="${keyword}[target]" value="${target}">
                                <input type="hidden" name="${keyword}[type]" value="${type}">
                            </div>
                            <i class="remove-menu fa fa-trash-alt"></i>
                        </div>
                    </div>
                </div>
            `);
        }
    
    });
    
    
    $(document).on('click','.remove-menu',function(){
        $(this).parent().parent().parent().remove();
    
    });

    

    // Sorting Section
    if( $('#section-list').length > 0 ){
        var el = document.getElementById('section-list');
        Sortable.create(el, {
            animation: 100,
            group: 'list-1',
            draggable: '.draggable-item',
            handle: '.draggable-item',
            sort: true,
            filter: '.sortable-disabled',
            chosenClass: 'active'
        });
    }


    jQuery(document).ready(function () {
        ImgUpload();
      });
      
      function ImgUpload() {
        var imgWrap = "";
        var imgArray = [];
      
        $('.upload__inputfile').each(function () {
          $(this).on('change', function (e) {
            imgWrap = $('#multi-image').find('.upload__img-wrap');
            var maxLength = $(this).attr('data-max_length');
      
            var files = e.target.files;
            var filesArr = Array.prototype.slice.call(files);
            var iterator = 0;
            filesArr.forEach(function (f, index) {
      
              if (!f.type.match('image.*')) {
                return;
              }
      
              if (imgArray.length > maxLength) {
                return false
              } else {
                var len = 0;
                for (var i = 0; i < imgArray.length; i++) {
                  if (imgArray[i] !== undefined) {
                    len++;
                  }
                }
                if (len > maxLength) {
                  return false;
                } else {
                  imgArray.push(f);
      
                  var reader = new FileReader();
                  reader.onload = function (e) {
                    var html = "<div class='upload__img-box'><div style='background-image: url(" + e.target.result + ")' data-number='" + $(".upload__img-close").length + "' data-file='" + f.name + "' class='img-bg'><div class='upload__img-close'></div></div></div>";
                    imgWrap.append(html);
                    iterator++;
                  }
                  reader.readAsDataURL(f);
                }
              }
            });
          });
        });
      
        $('body').on('click', ".upload__img-close", function (e) {
          var file = $(this).parent().data("file");
          for (var i = 0; i < imgArray.length; i++) {
            if (imgArray[i].name === file) {
              imgArray.splice(i, 1);
              break;
            }
          }
          $(this).parent().parent().remove();
        });
      }


