// FRONTEND, i.e. cannot require anything, nor can it talk to the DB

const allHatsList = $('#all-hats');

const kindInput = $('[name="kind"]');
const colorInput = $('[name="color"]')
const brimInput = $('[name="brim"]')
const weightInput = $('[name="weight"]')

$('#add-hat-submit').on('click', function () {
  $.ajax({
    method: 'POST',
    url: '/api/hats',
    data: {
      kind: kindInput.val(),
      color: colorInput.val(),
      brim: brimInput.val() == 'on',
      weight: weightInput.val()
    }
  })
  .then(function (hat) {
    const newElement = $(`<li style="color: ${hat.color}">${hat.kind}</li>`);
    allHatsList.append(newElement);
  })
  .catch(function (err) {
    console.error(err);
  });
});

$.ajax({
  method: 'GET',
  url: '/api/hats'
})
.then(function (hats) {
  hats.forEach(function (hat) {
    const newElement = $(`<li style="color: ${hat.color}">${hat.kind}</li>`);
    allHatsList.append(newElement);
  });
});
