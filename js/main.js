$(document).ready(function () {    
    let datapro = [];

    if (localStorage.getItem("product") !== null && localStorage.getItem("product") !== []) {
        datapro = JSON.parse(localStorage.getItem("product"));
        function for1() {
            for (let i = 0; i < datapro.length; i++) {
                if (datapro[i] == null) {
                    datapro.splice(i, 1);
                    for1();
                    break;
                }
                if (datapro.length - 1 == i) {
                    localStorage.setItem('product', JSON.stringify(datapro));
                }
            }
        }
        for1();
        showOutput();
        deletAll();
    } else {
        $('#delAll').hide();
    }

    function btnSearch(e, text) {
        $(e).click(() => {
            $('#search').attr('placeholder', `Search By ${text}`);
            for (let i = 0; i < datapro.length; i++) {
            }
            $('#search').focus();
            searching(text);
        });
    }

    function searching(t) {
        $('#search').on('input', () => {
            $('#outputsData').html('');
            for (let i = 0; i < datapro.length; i++) {
                if(datapro[i][`${t}`].includes($('#search').val())) {
                    createTable(i);
                }
            }
            if($('#search').val() === '') {
                $('#outputsData').html('');
                showOutput();
            }
        });
    }
    
    function getTotal(e) {
        $(e).on('input', () => {
            if ($('#price').val() != '') {
                let result = +($('#price').val()) + +($('#taxes').val()) + +($('#ads').val()) - +($('#discount').val());
                $('#total').html(result);
                $('#total').css('background', '#040');
            } else {
                $('#total').html('');
                $('#total').css('background', '#a00d02');
            }
        });
    }
    
    function createTable(i) {
        let tr = $('<tr>').append($('<td>').text(i+1));
        for (let j in datapro[i]) {
            if(j == 'price' || j == 'taxes' || j == 'ads' || j == 'discount' || j == 'total') {
                tr.append($('<td>').text(datapro[i][`${j}`] + '$'));
            } else {
                tr.append($('<td>').text(datapro[i][`${j}`]));
            }
        };

        tr.append($('<td>').append($('<button>').text('update').attr('num', datapro[i].id).click(() => {
            window.scrollTo({
                top:0,
                left:0,
                behavior:"smooth"
            });
            $('#title').val(datapro[i].title);
            $('#price').val(datapro[i].price);
            $('#taxes').val(datapro[i].taxes);
            $('#ads').val(datapro[i].ads);
            $('#discount').val(datapro[i].discount);
            $('#total').text(datapro[i].total);
            $('#category').val(datapro[i].category);
            if ($('#submit').next().attr('id') != 'update') {
                $('#submit').after('<button id="update">update</button>')
            }
            $('#count').hide();
            $('#submit').hide();
            $('#update').css('display', 'inline-block');
            $('#total').css('background', '#040');

            $('#update').click(() => {
                if (+($('#total').text()) > 0 && $('#title').val() != '' && $('#category').val() != '') {
                    let newPro = {
                        title : $('#title').val(),
                        price : $('#price').val(),
                        taxes : ($('#taxes').val() || 0),
                        ads : ($('#ads').val() || 0),
                        discount : ($('#discount').val() || 0),
                        total : $('#total').text(),
                        category : $('#category').val()
                    };
                    
                    datapro[i] = newPro;
                    localStorage.setItem('product', JSON.stringify(datapro));
        
                    $('#update').remove();
                    $('#count').css('display', 'inline-block');
                    $('#submit').css('display', 'inline-block');
                    $('#outputsData').html('');    
                    showOutput();
                    clearInputs();
                }
            });
        }
        )));

        tr.append($('<td>').append($('<button>').text('delete').attr('num', `${i+1}`).click(() => {
            datapro.splice(i, 1);
            $('#outputsData').html('');
            localStorage.setItem('product', JSON.stringify(datapro));
            if (datapro.length === 0) {
                document.getElementById('delAll').style.display = 'none';
            } else {
                deletAll();
            }
            showOutput();
        })));

        $('#outputsData').append($(tr));
    }
    
    function clearInputs() {
        $('#title').val('');
        $('#price').val('');
        $('#taxes').val('');
        $('#ads').val('');
        $('#discount').val('');
        $('#total').text('');
        $('#count').val('');
        $('#category').val('');
        $('#total').css('background', '#a00d02');
    }
    
    function showOutput() {
        for (let i = 0; i < datapro.length; i++) {
            createTable(i);
        }
    }
    
    function deletAll() {
        $('#delAll').css('display', 'inline-block');
        $('#delAll').html(`Delete All (${datapro.length})`)
        $('#delAll').click(() => {
            $('#outputsData').html('');
            localStorage.removeItem('product');
            datapro = [];
            $('#delAll').hide();
        });
    }
    
    $('#submit').click(() => {
        if (+($('#total').text()) > 0 && $('#title').val() != '' && $('#category').val() != '') {
            for (let i = 0; i < (+($('#count').val()) || 1); i++) {
                let newPro = {
                    title : $('#title').val(),
                    price : $('#price').val(),
                    taxes : ($('#taxes').val() || 0),
                    ads : ($('#ads').val() || 0),
                    discount : ($('#discount').val() || 0),
                    total : $('#total').text(),
                    category : $('#category').val()
                };
                datapro.push(newPro);
            }
            localStorage.setItem('product', JSON.stringify(datapro));
            clearInputs();
            $('#outputsData').html('');
            deletAll();
            showOutput();
        }
    });
    searching('title');
    btnSearch($('#searchTitle'), 'title');
    btnSearch($('#searchCategory'), 'category');
    getTotal($('.price input'));
});    









