/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function ListadoArticulosRevista() {
    var html = "Ningun Dato que mostrar";
    $.ajax({
        type: "GET",
        url: "/mostrarArticulo",
        success: function (data) {
            for (var i = 0; i < data.length; i++) {
                html += "<tr>";
                html += "<td style='width:37%; height: 400px'><iframe style='width:100%; height: 100%' src='archivos/" + data[i].url_articulo + "'></iframe></td>";
                html += "<td>" + data[i].url_articulo + "</td>";
                html += "<td>" + data[i].titulo + "</td>";
                html += "<td><a id='btn_elegir_" + i + "' href='#'>Elegir</a>\n\
                                        <script>\n\
                                            $('#btn_elegir_" + i + "').click(function(){\n\
                                                var x = document.getElementById('editar');\n\
                                                x.style.display = '';\n\
                                                $('#id_articulo').val('" + data[i].id_articulo + "');\n\
                                                $('#url_articulo').val('" + data[i].url_articulo + "');\n\
                                                $('#titulo').val('" + data[i].titulo + "');\n\
                                            }); \n\
                                </script>";
                html += "</td>";
                html += "</tr>";
            }

            console.log(data);
            $("#tabla tbody").html(html);
        }
    });
}

function ocultar(){
    document.getElementById('editar').style.display = 'none';
}

