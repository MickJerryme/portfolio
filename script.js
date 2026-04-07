// DRAG & DROP FUNCTION
document.querySelectorAll('.drop-zone').forEach(zone => {
  // Make drop zone clickable to open file browser
  zone.addEventListener('click', e => {
    if (!e.target.tagName.match(/IMG|A/)) {
      const input = zone.querySelector('input[type="file"]');
      if (input) input.click();
    }
  });

  zone.addEventListener('dragover', e => {
    e.preventDefault();
    zone.classList.add('dragover');
  });

  zone.addEventListener('dragleave', () => {
    zone.classList.remove('dragover');
  });

  zone.addEventListener('drop', e => {
    e.preventDefault();
    zone.classList.remove('dragover');

    const files = e.dataTransfer.files;

    for(let file of files){
      if(file.type.startsWith('image/')){
        const reader = new FileReader();

        reader.onload = function(ev){
          const img = document.createElement('img');
          img.src = ev.target.result;
          img.style.cursor = 'pointer';
          img.onclick = function() { openViewer(ev.target.result); };
          zone.innerHTML = '';
          zone.appendChild(img);
        }

        reader.readAsDataURL(file);
      }
    }
  });

});

function openViewer(src){
document.getElementById("viewer").style.display="flex";
document.getElementById("viewerImg").src=src;
}

function closeViewer(){
document.getElementById("viewer").style.display="none";
}

// Form submit handlers (to be called on button click)
function handleSubmit(formId) {
  const form = document.getElementById(formId);
  const proofZone = form.querySelector('.proof-drop-zone');
  const title = form.querySelector('input[name="title"]').value;
  
  if (proofZone.children.length === 0 || !proofZone.querySelector('img')) {
    alert('Image proof is required!');
    return;
  }
  
  if (!title.trim()) {
    alert('Title is required!');
    return;
  }
  
  alert('Upload submitted successfully! (Client-side demo)');
}

