function setup() {

    const links_list = [
        "",
        window.location.href,
        "//www.google.com",
        "//www.facebook.com",
        "//www.youtube.com",
        "//www.yahoo.com",
        "//www.wikipedia.org",
        "//twitter.com",
        "//slashdot.org",
        "//www.google.co.in",
        "//world.taobao.com",
        "//outlook.live.com",
        "//www.yahoo.co.jp",
        "//www.linkedin.com",
        "//weibo.com",
        "//www.ebay.com",
        "//www.google.co.jp",
        "//yandex.ru",
        "//www.bing.com",
        "//m.vk.com",
        "//www.google.de",
        "//www.instagram.com",
        "//t.co",
        "//www.msn.com",
        "//www.google.co.uk",
        "//www.pinterest.com",
        "//www.ask.com",
        "//www.reddit.com",
        "//wordpress.com",
        "//mail.ru",
        ]
    
    let words_list = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]
    shuffle(words_list)
    words_list = get_first_items_from_list(words_list, links_list.length);

    const form = document.querySelector("#captcha-form")

    var links_dict = create_links_dict(words_list, links_list)
    create_docs(links_dict)

    form.addEventListener("submit", form_submit);
}


function get_first_items_from_list(list, number_of_items) {
    var first_items = []
    for (var i = 0; i < number_of_items; i++) {
        first_items.push(list[i])
    }
    return first_items
}

function create_links_dict(words, links) {
    if (words.length != links.length) {
        return "Error: words and links must be the same length"
    }

    shuffle(words);
    shuffle(links);
    link_dict = {}
    words.forEach((key, i) => link_dict[key] = links[i]);
    
    return link_dict
}


function create_docs(link_dict) {

    const parent_div = document.getElementById("history-test")
// loop over links_dict and create a new elemtn for each key and appent it to the body
    for (var key in link_dict) {
        var new_element = document.createElement("a");
        new_element.innerHTML = key;
        new_element.href = link_dict[key];
        new_element.classList.add("history-link")
        link_dict[key] == "" ? new_element.classList.add("history-positive"): new_element.classList.add("history-test-link")
        parent_div.appendChild(new_element);
    }
}

function form_submit(event) {

    event.preventDefault();
    const form_data = new FormData(event.target);
    const form_data_dict = {}
    form_data.forEach((value, key) => form_data_dict[key] = value)

    let words_input = form_data_dict["captcha-form-words"].toLowerCase().split("");
    let websites = [];

    words_input.forEach((word) => {
        if (word in link_dict) {
            websites.push(link_dict[word])
        }
    })

    if (!websites.includes("")) {
        document.querySelector("#captcha-error").style.display = "block";
    } else {
        websites = [...new Set(websites)];
        // remove empty string
        websites = websites.filter(function(item) {
            return item !== ""
        })
        send_to_server(websites);
        document.querySelector("#captcha-error").style.display = "none";
        document.querySelector("#captcha-success").style.display = "block";
    }
}

setup();