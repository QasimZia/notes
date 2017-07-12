$(document).ready(function() {
    $('#new_note').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            url: 'process',
            method: 'post',
            data: $(this).serialize(),
            success: function(serverResponse){
                $('.main-content').replaceWith(serverResponse);
                console.log(serverResponse);
            }
        });
        $(this).trigger('reset');
    });
    $(document).on('click', '.note', function() {
        var currentPost = $(this).children('.note_content').text();
        var currentID = $(this).children('.note_id').attr('value')
        var currentURL = `update/${currentID}`
        var csrf = $($('meta')[1]).attr('content') 
        $(this).replaceWith(`
        <form id='edit_note' note_id='${currentID}' action='${currentURL}' method='post'>
            ${csrf}
            <textarea name='update' rows='5' cols='40'>${currentPost}</textarea>
            <br>
            <input type='submit' name='submit'>
        </form>
        `)
    });
    $(document).on('submit', '#edit_note' , function(e) {
        var currentID = $(this).attr('note_id')
        e.preventDefault();
        $.ajax({
            url: `update/${currentID}`,
            method: 'post',
            data: $(this).serialize(),
            success: function(serverResponse){
                $('.main-content').replaceWith(serverResponse);
                console.log(serverResponse);
            }
        });
    });
    $(document).on('click', '.deleteLink', function(e) {
        e.preventDefault();
        var currentID = $(this).attr('noteid');
        $.ajax({
            url: `delete/${currentID}`,
            method: 'get',
            // data: $(this).serialize,
            success: function(serverResponse){
                $('.main-content').replaceWith(serverResponse);
            }
        });
    });
});
