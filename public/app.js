/* SPA --> single page application
client side 
IIFE --> immediate invoked function expression
*/

(function(){
    function Start()
    {
        console.log("App started");
    }
    window.addEventListener("load", Start);
})();

// delete confirmation --> public.ejs
function confirmDelete(id) {
    if (confirm("Confirm delete")) {
        window.location.href = '/public/delete/' + id;
    } else {
        return false;
    }
}