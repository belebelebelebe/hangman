const wordForm = document.getElementById("wordForm");
wordForm.addEventListener('submit', function(event){
    event.preventDefault();
    const words3 = [];
    words3.push(document.getElementById('word1').value);
    words3.push(document.getElementById('word2').value);
    words3.push(document.getElementById('word3').value);
    console.log(words3);
    localStorage.setItem('words3', JSON.stringify(words3))
    window.location.href = "2game.html";
});
