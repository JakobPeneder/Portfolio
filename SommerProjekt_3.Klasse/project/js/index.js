
document.getElementById('search').addEventListener('keyup', function(event) {
    if(event.key == 'Enter') {
        search();
    }
});


function search() {
    let search = document.getElementById('search').value;
    window.location.href = `./pages/search.php?search=${search}`;
        
}
function getToProductPage(id) {
    window.location.href = `./pages/product.php?id=${id}`;
}