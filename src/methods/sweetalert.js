import Swal from 'sweetalert2';

// toast
const toastAlert = Swal.mixin({
    toast: true,
    width: 370,
    showConfirmButton: false,
    timer: 1500
});

export const toast = (position, icon, text) => {
    toastAlert.fire({
        position,
        icon,
        text,
    });
};

// sweetalert
const swalAlert = Swal.mixin({
    showConfirmButton: true,
});

export const sweetalert = (icon, title) => {
    swalAlert.fire({
        icon,
        title,
    })
};