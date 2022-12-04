//
// edit
//

// title
$(".edit_title").on("keyup", function(){
        const title = $(this).val();
        $("title").text(title);

        //save
        const url1 = location.href;
        const url2 = url1.split("/").slice(-1);
        const url3 = url2[0].replace(".html", "");
        localStorage.setItem("title_" + url3, title);
})

// check
$(".edit_checkbox").on("click", function(){
    const check = $(this).prop("checked");
    const title = $(".edit_h1").val();
    const title2 = $(".edit_title").val();
    if(check == true){
        $(".edit_title").attr("disabled", "true");
        $("title").text(title);

        // save
        const url1 = location.href;
        const url2 = url1.split("/").slice(-1);
        const url3 = url2[0].replace(".html", "");
        localStorage.setItem("check_" + url3, "true");
    }else{
        $(".edit_title").removeAttr("disabled");
        $("title").text(title2);
        
        // save
        const url1 = location.href;
        const url2 = url1.split("/").slice(-1);
        const url3 = url2[0].replace(".html", "");
        localStorage.removeItem("check_" + url3);
    }
})

// head
$(".edit_h1").on("keyup", function(){
    const h1 = $(this).val();
    if(h1 !== ""){
        const html = $(".view_area").html();
        if(html.indexOf("</h1>") >= 0){
            $(".head1").text(h1);
        }else{
            $(".view_h1").after("<h1 class=\"head1\"></h1>");
            $(".head1").text(h1);
        }
    }else{
        $(".head1").remove();
    }

    // save
    const url1 = location.href;
    const url2 = url1.split("/").slice(-1);
    const url3 = url2[0].replace(".html", "");
    localStorage.setItem("h1_" + url3, h1);
    

    // title
    const check = $(".edit_checkbox").prop("checked");
    if(check == true){
        $("title").text(h1);
    }
})

// ruby
$(".edit_ruby").on("keyup", function(){
    const ruby = $(this).val();
    $(".view_ruby").text(ruby);

    // save
    const url1 = location.href;
    const url2 = url1.split("/").slice(-1);
    const url3 = url2[0].replace(".html", "");
    localStorage.setItem("ruby_" + url3, ruby);
})

// exm
$(".edit_exm").on("keyup", function(){
    const exm = $(this).val().replace(/＠(.*?)＠/g, "<b>$1</b>");
    $(".view_exm").html(exm);

    // save
    const url1 = location.href;
    const url2 = url1.split("/").slice(-1);
    const url3 = url2[0].replace(".html", "");
    localStorage.setItem("exm_" + url3, exm);
})

// profile
$(".table_left, .table_right").on("keyup", function(){
    $(".view_table").html("");
    const L = $(".table_left").val().split("\n").filter(Boolean);
    const R = $(".table_right").val().split("\n").filter(Boolean);
    if(L.length !== 0){
        const html = $(".view_area").html();
        if(html.indexOf("view_table") >= 0){
            for(let i = 0; i < L.length; i++){
                const tdR = (R[i]?.toString() ?? "").replace(/＠/g, "<br>");
                const tr = "<tr><td class=\"td1\">" + L[i] + "</td><td class=\"td2\">" + tdR + "</td></tr>";
                $(".view_table").html($(".view_table").html() + tr);
            }
        }else{
            $(".table_area").after("<h2 class=\"table_h2\">プロフィール</h2><table class=\"view_table\" border=\"1\"></table>");
        }
    }else{
        $(".view_table, .table_h2").remove();
    }

    // save
    const url1 = location.href;
    const url2 = url1.split("/").slice(-1);
    const url3 = url2[0].replace(".html", "");
    const LL = $(".table_left").val();
    const RR = $(".table_right").val();
    localStorage.setItem("proL_" + url3, LL);
    localStorage.setItem("proR_" + url3, RR);

    // size
    $(this).height("16px");
    const hei = $(this)[0].scrollHeight - 2;
    $(this).height(hei);
})

// content
$(".edit_content").on("keyup", function(){
    $(".view_content").html("");
    const text = $(this).val().split("\n");
    for(let i = 0; i < text.length; i++){
        const con = $(".view_content").html();
        if(text[i].match(/^：：：：：/)){
            const h6 = text[i].replace(/^：：：：：(.*)/, "<h6>$1</h6>");
            $(".view_content").html(con + h6);
        }else if(text[i].match(/^：：：：/)){
            const h5 = text[i].replace(/^：：：：(.*)/, "<h5>$1</h5>");
            $(".view_content").html(con + h5);
        }else if(text[i].match(/^：：：/)){
            const h4 = text[i].replace(/^：：：(.*)/, "<h4>$1</h4>");
            $(".view_content").html(con + h4);
        }else if(text[i].match(/^：：/)){
            const h3 = text[i].replace(/^：：(.*)/, "<h3>$1</h3>");
            $(".view_content").html(con + h3);
        }else if(text[i].match(/^：/)){
            const h2 = text[i].replace(/^：(.*)/, "<h2>$1</h2>");
            $(".view_content").html(con + h2);
        }else if(text[i].match(/^\-/)){
            const b = text[i].replace(/＠(.*?)＠/g, "<b>$1</b>");
            const b_li = b.replace(/^\-(.*)/, "<li>$1</li>");
            const b_li_a = b_li.replace(/\+(.*?)\+(.*?)\+/g, "<a href=\"$2\">$1</a>");
            $(".view_content").html(con + b_li_a);
        }else if(text[i].match(/^＠/)){
            const br = text[i].replace(/^＠/, "<br>");
            $(".view_content").html(con + br);
        }else{
            const p = text[i].replace(/(.*)/, "<p>$1</p>");
            const p_b = p.replace(/＠(.*?)＠/g, "<b>$1</b>");
            const p_b_a = p_b.replace(/\+(.*?)\+(.*?)\+/g, "<a href=\"$2\">$1</a>");
            $(".view_content").html(con + p_b_a);
        }
    }

    // save
    const url1 = location.href;
    const url2 = url1.split("/").slice(-1);
    const url3 = url2[0].replace(".html", "");
    const content = $(this).val();
    localStorage.setItem("content_" + url3, content);

    // size
    $(this).height("16px");
    const hei = $(this)[0].scrollHeight - 2;
    $(this).height(hei);

    // p remove
    $("p:empty").remove();
})

// reset
$(".edit_reset_button").on("click", function(){
    const select = confirm("この操作は取り消せません。\n本当に実行しますか？");
    if(select == true){
        $(".edit_title, .edit_h1, .edit_ruby, .edit_exm, .table_left, .table_right, .edit_content").val("");
        $(".edit_title, .edit_h1, .edit_ruby, .edit_exm, .table_left, .table_right, .edit_content").trigger("keyup");
        $(".edit_checkbox").prop("checked", false);
        $(".edit_title").removeAttr("disabled");
        const url1 = location.href;
        const url2 = url1.split("/").slice(-1);
        const url3 = url2[0].replace(".html", "");
        localStorage.removeItem("title_" + url3);
        localStorage.removeItem("check_" + url3);
        localStorage.removeItem("h1_" + url3);
        localStorage.removeItem("ruby_" + url3);
        localStorage.removeItem("exm_" + url3);
        localStorage.removeItem("proL_" + url3);
        localStorage.removeItem("proR_" + url3);
        localStorage.removeItem("content_" + url3);
    }
})

// finish
$(".edit_finish_button").on("click", function(){
    $(".view_area").show();
    $(".edit_area").css("left", "-100vw");
})

// window onload
$(window).on("load", function(){
    const url1 = location.href;
    const url2 = url1.split("/").slice(-1);
    const url3 = url2[0].replace(".html", "");

    $(".url1").text(url1);

    const title = localStorage.getItem("title_" + url3);
    const check = localStorage.getItem("check_" + url3);
    const h1 = localStorage.getItem("h1_" + url3);
    const ruby = localStorage.getItem("ruby_" + url3);
    const exm = localStorage.getItem("exm_" + url3);
    const proL = localStorage.getItem("proL_" + url3);
    const proR = localStorage.getItem("proR_" + url3);
    const content = localStorage.getItem("content_" + url3);

    $(".edit_title").val(title);
    $(".edit_h1").val(h1);
    $(".edit_ruby").val(ruby);
    $(".edit_exm").val(exm);
    $(".table_left").val(proL);
    $(".table_right").val(proR);
    $(".edit_content").val(content);

    if(check == null){
        $(".edit_checkbox").prop("checked", true);
    }

    $(".edit_title, .edit_h1, .edit_ruby, .edit_exm, .table_left, .table_right, .edit_content").trigger("keyup");
    $(".edit_checkbox").trigger("click");

    // mokuji
    if($(".tocbox").length == 0){
        $("body").prepend("<div class=\"tocbox\"></div>");
    }
    $(".tocbox").append("<b>目次</b>");
    for(let i = 0; i < $("h1, h2, h3").length; i++){
        $(".tocbox").append("<li><a class=\"tocText\">　</a></li>");
    }
    for(let i = 0; i < $("h1, h2, h3").length; i++){
        const headScrollHeight = $("h1, h2, h3").eq(i).offset().top - 40;
        const headText = $("h1, h2, h3").eq(i).text();
        const headType = $("h1, h2, h3").eq(i).prop("outerHTML").slice(2, 3) * 1.5;
        $(".tocText").eq(i).attr("onclick", "window.scroll({top : " + headScrollHeight + ", behavior : 'smooth'}); $(\".tocbox\").slideToggle(100);");
        $(".tocText").eq(i).parent().attr("style", "position: relative; left: " + headType + "em;");
        $(".tocText").eq(i).text(headText);
    }
    $(".tocText").removeAttr("class");
})

//
// view
//

// scroll menu
$(window).on("scroll", function(){
    const top = $(window).scrollTop();
    if(top > 70){
        $(".view_menubox").css("position", "fixed");
        $(".view_menubox").css("top", "0");
        $(".tocbox").css("position", "fixed");
        $(".tocbox").css("top", "31px");
    }else{
        $(".view_menubox").css("position", "absolute");
        $(".view_menubox").css("top", "70px");
        $(".tocbox").css("position", "absolute");
        $(".tocbox").css("top", "101px");
    }
})

// menubox

//home
$(".home_menu").on("click", function(){
    location.href = "file:///C:/Users/Guest/Desktop/%E3%82%8C%E3%81%8A%E3%82%93/HTML/%E6%96%87%E6%9B%B8%E4%BD%9C%E6%88%90/%E5%89%B5%E9%80%A0.html";
})

//content
$(".content_menu").on("click", function(){
    $(".tocbox").slideToggle();
})

// reload
$(".reload_menu").on("click", function(){
    const url = $(".url1").text();
    location.href = url;
})

// top
$(".top_menu").on("click", function(){
    window.scroll({top : 0, behavior : "smooth"});
})

// edit
$(".edit_menu").on("click", function(){
    $(".view_area").hide();
    $(".edit_area").css("left", "0");
    window.scroll({top : 0, behavior : "auto"});
})