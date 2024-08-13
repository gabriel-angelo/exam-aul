$(() => {
    function ajaxServer(
        type,
        url,
        data = null,
        feedback,
        processData = undefined,
        contentType = undefined,
    ) {
        $.ajax({
            type,
            url,
            dataType: "json",
            data,
            success: feedback,
            processData,
            contentType,
        });
    }


    function guiUserInfo (user) {
        
        return `<tr class="cls-tr-contact-user" id="${user._id}">
                    <td>
                        <div class="form-check mb-0">
                            <input class="form-check-input" type="checkbox" value="">
                        </div>
                    </td>
                    <td>
                        <div class="avatar avatar-circle avatar-xs me-2">
                            <img src="./img/logo/user-avatar-account.jpg" alt="..." class="avatar-img" width="30" height="30">
                        </div>
                        <span class="name fw-bold">${(user.name +" "+ user.lastname).toUpperCase() +" "+ user.firstname}</span>
                    </td>
                    <td class="email">${user.contact}</td>
                    <td class="id">${user.address}</td>
                    <td><span class="text-info" id="${user._id}" data-bs-toggle="modal" onclick="editChecktUser(this)" data-bs-target="#editPerson"><i class="ti ti-user-edit"></i></span></td>
                    <td><span class="text-danger" id="${user._id}" onclick="deletetUser(this)"><i class="ti ti-trash"></i></span></td>
                    <td><span class="text-warning" title="Paiement" id="${user._id}" onclick="paieUser(this)" ><i class="ti ti-cash-register"></i></span></td>
                </tr>`;
    }
    
    function feedbackStarted(res) {
        const users = res.data;
        const listUsers = users.map(e => guiUserInfo(e))
        $(`.cls-user-fields-contact`).append(listUsers);
    }

     (function () {
        return ajaxServer("GET", '/get-user-all', null,feedbackStarted)
    }());
    //================ CRUD DOCUMENT ==================

    //============= USING LOCALSTORAGE ============

    /* usersToAssign = function () {
        const users = JSON.parse(localStorage.getItem('users'))
        return users.map(user => `<option value="${user._id}">${user.fullname}</option>`).join('');
    } */

    //============= DECLENCHEMENT DE EVENTS ===========

    removeContactUser = (arg) => {
        return $(arg).parent(".cls-contact-user").remove();
    };

    editChecktUser = (arg)=>{
        const id=arg.id
        ajaxServer("GET", `/user-get-one`, {id}, feedbackgetUser);
    }

    paieUser = (arg) => {
        console.log(arg.id);
        window.location.href = "/paie?id="+arg.id;
    }

    deletetUser = (arg)=>{
        const id=arg.id
        console.log("DELETE ");
        ajaxServer("DELETE", `/user-delete`, {id}, feedbackdeleteUser);
    }

    cloneContactUser = () => {
        const contactUserField = `<div class="input-group mb-3 cls-contact-user">
            <span class="input-group-text" id="cls-user-phone"><i class="ti ti-phone"></i> (081-xx-xx-xxx)</span>
            <input type="phone" name="contact" class="form-control" placeholder="Numéro de tél. de la personne" aria-label="Phone" aria-describedby="cls-user-phone">
            <span class="input-group-text text-danger" onclick="removeContactUser(this)" id="basic-addon2"><i class="ti ti-trash"></i></span>
        </div>`;
        return $(".cls-container-contact-user").append(contactUserField);
    };

    //================ FORM PROCESS =================

    function feedbackNewUser(res) {
        const user = res.data
        $("form#cls-form-user-info")[0].reset();
        $(`.cls-close-user-info`).click();
        $(`.cls-user-fields-contact`).append(guiUserInfo(user));
    }

    function feedbackdeleteUser(res) {
        const id=res.data
        $(`table .cls-user-fields-contact tr#${id}`).remove();
    }

    function feedbackgetUser(res) {
        const user = res.data
        console.log(res.data);
        
        $("#cls-form-user-edit ").attr("title",user._id)
        $("#cls-form-user-edit #id-name").val(user.name)
        $("#cls-form-user-edit #id-lastname").val(user.lastname)
        $("#cls-form-user-edit #id-firstname").val(user.firstname)
        $("#cls-form-user-edit input[name=address]").val(user.address)
        $("#cls-form-user-edit input[name=contact]").val(user.contact)
    }

    function feedbackEditUser(res) {
        const user = res.data
        console.log("fEED BACK",user);
        
        
        $(`table .cls-user-fields-contact tr#${user._id}`).addClass('alert text-bg-primary-soft');
        setTimeout(function () {
            $(`table .cls-user-fields-contact tr#${user._id}`).replaceWith(guiUserInfo(user));
            $(`table .cls-user-fields-contact tr#${user._id}`).css('class','initial');
        }, 500);
        
    }

    function feedbackPaieUser(res) {
        const paie = res.data
        console.log("fEED BACK",paie);
    }

    $("form").on("submit", function (e) {
        e.preventDefault();
        const oData = new FormData(this);
        const user = Object.fromEntries(oData.entries());
        user.contact = oData.getAll("contact");
        
        if(this.id == "cls-form-user-edit") {
            console.log("EDITION")
            user.id = this.title
            console.log("AVANT MODIFICATION :",user);
            
            ajaxServer("PUT", `/user-edit`, user, feedbackEditUser);
        }

        if(this.id == "cls-form-user-add"){
            console.log("ADDITION");
            ajaxServer("POST", `/user-form-add`, user, feedbackNewUser);
        }

        if(this.id == "cls-form-user-paie"){
            ajaxServer("POST", `/user-paie`, user, feedbackPaieUser);
        }
        
        $("form#"+this.id)[0].reset();
        $(`.cls-close-user-info`).click();
    });
});
