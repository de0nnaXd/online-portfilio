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


function confirmDelete() {
    return confirm('Are you sure you want to delete?');
}