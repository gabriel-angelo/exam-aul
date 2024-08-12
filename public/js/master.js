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
                    <img src="https://d33wubrfki0l68.cloudfront.net/ea01948f5a48922378b407c27d2b4e5809ed4949/35ecd/assets/images/profiles/profile-11.jpeg" alt="..." class="avatar-img" width="30" height="30">
                </div>
                <span class="name fw-bold">${(user.name +" "+ user.lastname).toUpperCase() +" "+ user.firstname}</span>
            </td>
            <td class="email">${user.contact}</td>
            <td class="id">${user.address}</td>
            <td class="date" data-signed="1635289200">${user.isMember=="on"?"ok":"no"}</td>
            <td><span class="text-info" onclick="editContactUser()"><i class="ti ti-user-edit"></i></span></td>
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
        
        console.log("Click sur fin", res);
        $("form#cls-form-user-info")[0].reset();
        $(`.cls-close-user-info`).click();
        $(`.cls-user-fields-contact`).append(guiUserInfo(user));
    }

    $("form#cls-form-user-info").on("submit", function (e) {
        e.preventDefault();
        const oData = new FormData(this);
        const user = Object.fromEntries(oData.entries());
        user.contact = oData.getAll("contact");

        ajaxServer("POST", `/user-form-add`, user, feedbackNewUser);
    });
});
