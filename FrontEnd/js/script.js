$(document).ready(function () {
    // Nav Links
    $(".nav_li").mouseenter(function () {
        $(this).children("div").slideDown(250)
    })
    $(".nav_li").mouseleave(function () {
        $(this).children("div").slideUp(250)
    })
    $("li").mouseenter(function () {
        $(this).children(".side").slideDown(150)
    })
    $("li").mouseleave(function () {
        $(this).children(".side").slideUp(150)
    })
    $(".Shop").mouseenter(function () {
        $(this).children("div").slideDown({
            start: function () {
                $(this).css({
                    display: "flex"
                })
            }
        })
    })

    $(window).on('scroll', function () {
        if ($(window).scrollTop() > 350) {
            $("header").addClass("sticky")
        } else {
            $("header").removeClass("sticky")
        }

    })

    $(window).on('scroll', function () {
        if ($(window).scrollTop() > 350) {
            $("#backToTop").fadeIn(250)
        } else {
            $("#backToTop").fadeOut(250)
        }
    })

    $("#backToTop").click(function () {
        $(window).scrollTop(0)
    })


    // Nav Links

    // Search and cart

    $(".search_btn").click(function () {
        $(".form-group").slideToggle(300)
    })
    $(".cart").mouseenter(function () {
        $(".cart_add").slideDown(300)
    })
    $(".cart").mouseleave(function () {
        $(".cart_add").slideUp(300)
    })

    // Search and cart

    // Sandwich
    $(".sand_li").click(function () {
        $(this).children("ul").slideToggle(100)
        $("ul.down").not($(this).children("ul.down")).slideUp(100)
    })

    // Sandwich

    // Burger
    const navSlide = () => {
        let navLinks = document.querySelectorAll(".sand_ul .sand_li")
        let burger = document.querySelector(".burger")
        burger.addEventListener("click", () => {
            $(".sand_ul").toggle({
                start: function () {
                    $(this).css({
                        display: "flex"
                    })
                }
            })
            navLinks.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = ""
                } else {
                    link.style.animation = `navLinkFade 0.4s ease forwards ${index / 7 + 0.3}s`
                }
            })
            burger.classList.toggle("toggle")
        })
    }
    navSlide()
    // Burger



    // Cart
    if (localStorage.getItem("cart") == null) {
        localStorage.setItem("cart", JSON.stringify([]))
    }

    $("#Items .items .add a").click(function (e) {
        e.preventDefault()
        window.location.reload()
        if (localStorage.getItem("cart") == null) {
            localStorage.setItem("cart", JSON.stringify([]))
        }
        let cart = JSON.parse(localStorage.getItem("cart"))
        let name = $(this).parent().parent().prev().children("span").text()
        let value = $(this).parent().next().attr("data-value")
        let src = $(this).parents(".item").children("img").attr("src")
        let id = $(this).parents(".item").attr("data-id")
        let sameFl = cart.find(fl => fl.Id === id)
        if (sameFl === undefined) {
            cart.push({
                Id: id,
                Name: name,
                Value: value,
                Source: src,
                Count: 1
            })
        } else {
            sameFl.Count += 1
        }

        localStorage.setItem("cart", JSON.stringify(cart))

    })


    function addCartNow() {
        let cartAdd = document.querySelector(".cart_add")
        let cart = JSON.parse(localStorage.getItem("cart"))
        let Total = document.querySelector(".Total")
        let total = 0

        for (let product of cart) {
            // Image
            let img = document.createElement("img")
            let divImg = document.createElement("div")

            // Name
            let name = document.createElement("span")
            let br = document.createElement("br")
            let divName = document.createElement("div")

            // Quantity
            let quantity = document.createElement("span")

            // Icon
            let i = document.createElement("i")

            img.setAttribute("src", product.Source)
            img.style.width = "100%"
            divImg.append(img)
            divImg.style.width = "55px"

            quantity.innerText = product.Count
            quantity.style.color = "#f34f34"


            total += product.Value * product.Count

            name.innerText = product.Name
            divName.append(name, br, quantity)
            divName.style.width = "100px"
            divName.style.padding = "0 15px"

            i.className = "fas fa-times"
            i.style.padding = "20px 0 0 35px"
            i.style.color = "#f34f34"
            i.style.cursor = "pointer"

            i.onclick = function () {
                window.location.reload()
                let items = JSON.parse(localStorage["cart"]);
                let data = row.getAttribute("data-id")
                for (var i = 0; i < items.length; i++) {
                    if (items[i].Id == data) {
                        items.splice(i, 1);


                    }
                }
                localStorage.setItem("cart", JSON.stringify(items))
                this.parentElement.remove()
            }

            let row = document.createElement("div")
            row.classList.add("row", "mt-3")
            row.setAttribute("data-id", product.Id)

            row.append(divImg, divName, i)

            cartAdd.append(row)



        }
        Total.innerText = "Total: " + total + "$"
        if (total == 0) {
            $("header .search_cart .cart_add button").addClass("d-none")
            $("header .cart_add .Total").addClass("d-none")
            $("header .search_cart .cart_add .noP").removeClass("d-none")
        } else {
            $("header .search_cart .cart_add button").removeClass("d-none")
            $("header .cart_add .Total").removeClass("d-none")
            $("header .search_cart .cart_add .noP").addClass("d-none")

        }
        $("header .search_cart .cart .value").text("$ " + total)
    }

    addCartNow()
    let ProCount = document.querySelector("header .cart sup")
    function CountBasket() {
        let cart = JSON.parse(localStorage.getItem("cart"))
        let count = cart.reduce((total, p) => total + p.Count, 0)
        ProCount.innerText = count
    }
    CountBasket()
    // Cart




    // Accordions
    $(".left_side .head").click(function () {
        $(".left_side .head").not(this).removeClass("background color")
        $(this).toggleClass("background color")
        $(this).next().slideToggle(200)
        $(".left_side .open").not($(this).next()).slideUp(200)
        $(".left_side .head .plus").not($(this).children(".plus")).show(100)
        $(".left_side .head .minus").not($(this).children(".minus")).hide(100)
        $(this).children(".plus").toggle(100)
        $(this).children(".minus").toggle(100)

    })
    $(".right_side .head").click(function () {
        $(".right_side .head").not(this).removeClass("background color")
        $(this).toggleClass("background color")
        $(this).next().slideToggle(200)
        $(".right_side .open").not($(this).next()).slideUp(200)
        $(".right_side .head .plus").not($(this).children(".plus")).show(100)
        $(".right_side .head .minus").not($(this).children(".minus")).hide(100)
        $(this).children(".plus").toggle(100)
        $(this).children(".minus").toggle(100)
    })

    // Accordions

    // Tabs

    $(".left_side .menu div").click(function () {
        $(".left_side .menu div").not(this).removeClass("selected")
        if ($(this).hasClass("selected") == false) {
            $(this).addClass("selected")
        }
        let contents = document.querySelectorAll(".left_side .content div")
        for (let content of contents) {
            if ($(this).attr("data-id") === content.getAttribute("data-id")) {
                content.classList.add("opened")
            } else {
                content.classList.remove("opened")
            }
        }

    })

    $(".right_side .menu div").click(function () {
        $(".right_side .menu div").not(this).removeClass("selected")
        if ($(this).hasClass("selected") == false) {
            $(this).addClass("selected")
        }
        let contents = document.querySelectorAll(".right_side .content div")
        for (let content of contents) {
            if ($(this).attr("data-id") === content.getAttribute("data-id")) {
                content.classList.add("opened")
            } else {
                content.classList.remove("opened")
            }
        }

    })
    $("#second_tabs .menu div").click(function () {
        $("#second_tabs .menu div").not(this).removeClass("selected")
        if ($(this).hasClass("selected") == false) {
            $(this).addClass("selected")
        }
        let contents = document.querySelectorAll("#second_tabs .content div")
        for (let content of contents) {
            if ($(this).attr("data-id") === content.getAttribute("data-id")) {
                content.classList.add("opened")
            } else {
                content.classList.remove("opened")
            }
        }

    })


    $(".side_tab .menu div").click(function () {
        $(".side_tab .menu div").not(this).removeClass("selected")
        if ($(this).hasClass("selected") == false) {
            $(this).addClass("selected")
        }
        let contents = document.querySelectorAll("#third_tabs .content div")
        for (let content of contents) {
            if ($(this).attr("data-id") === content.getAttribute("data-id")) {
                content.classList.add("opened")
            } else {
                content.classList.remove("opened")
            }
        }
    })
    // Tabs

    // Owl Slider
    $('.owl-carousel').owlCarousel({
        loop: true,
        margin: 10,
        nav: false,
        dots: false,
        autoplay: true,
        autoplayTimeout: 4000,
        autoplayHoverPause: true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 4
            },
            1000: {
                items: 8
            }
        }
    })

    var owl = $('.owl-carousel');
    owl.owlCarousel();
    $('.customNextBtn').click(function () {
        owl.trigger('next.owl.carousel');
    })
    $('.customPrevBtn').click(function () {
        owl.trigger('prev.owl.carousel', [300]);
    })

    $("#shop_owl .item").hover(function () {
        $(this).find(".add").toggle(120)
        $(this).find(".value").delay(120).toggle(20)
    })

    // Owl Slider

    // Product
    $("#Info .tabClick .menu div").click(function () {
        $("#Info .tabClick .menu div").not(this).removeClass("selected")
        if ($(this).hasClass("selected") == false) {
            $(this).addClass("selected")
        }
        let contents = document.querySelectorAll("#Info .content div.section")
        for (let content of contents) {
            if ($(this).attr("data-id") === content.getAttribute("data-id")) {
                content.classList.add("opened")
            } else {
                content.classList.remove("opened")
            }
        }

    })

    $("#Related .item").hover(function () {
        $(this).find(".add").toggle(120)
        $(this).find(".value").delay(130).toggle(20)
    })

    $("#Product .addCart .quantity .left").click(function () {
        let value = $(this).next().val()
        if (value > 0) {
            value--
            $(this).next().val(value)
        }

    })
    $("#Product .addCart .quantity .right").click(function () {
        let value = $(this).prev().val()
        if (value >= 0) {
            value++
            $(this).prev().val(value)
        }

    })
    // Product


})