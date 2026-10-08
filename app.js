document.getElementById("loginForm").addEventListener("submit", function(e){
  e.preventDefault();
  const name=document.getElementById("username").value.trim();
  if(!name)return;
  localStorage.setItem("farmerName",name);
  window.location.href="dashboard.html";
});
