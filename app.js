
function app(people) {
    displayWelcome();
    runSearchAndMenu(people);
    return exitOrRestart(people);
}

function displayWelcome() {
    alert('Hello and welcome to the Most Wanted search application!');
}

function runSearchAndMenu(people) {
    const searchResults = searchPeopleDataSet(people);

    if (searchResults.length > 1) {
        displayPeople('Search Results', searchResults);
    }
    else if (searchResults.length === 1) {
        const person = searchResults[0];
        mainMenu(person, people);
    }
    else {
        alert('No one was found in the search.');
    }
}

function searchPeopleDataSet(people) {

    const searchTypeChoice = validatedPrompt(
        'Please enter in what type of search you would like to perform.',
        ['id', 'name', 'traits']
    );

    let results = [];
    switch (searchTypeChoice) {
        case 'id':
            results = searchById(people);
            break;
        case 'name':
            results = searchByName(people);
            break;
        case 'traits':
            //! TODO
            // results = searchByTraits(people);
            results = searchByTraits(people)
            break;
        default:
            return searchPeopleDataSet(people);
    }

    return results;
}

function recursiveFindFunction (people, array = []) {
    let subArray = people;
    array = [people];
    if (subArray.length === 0) {
        return array
    }
    for (let i = 0; i < subArray.length; i++) {
        array = array.concat(
            recursiveFindFunction(subArray[i])
        );
    }
    return array;
}

function searchById(people) {
    const idToSearchForString = prompt('Please enter the id of the person you are searching for.');
    const idToSearchForInt = parseInt(idToSearchForString);
    const idFilterResults = people.filter(person => person.id === idToSearchForInt);
    return idFilterResults;
}

function searchByTraits(people) {
    const traitsToSearchFor = validatedPrompt(`Please enter the traits of the person you are searching for.`, ["gender", "dob", "height", "weight", "eyecolor", "occupation"] );
    switch (traitsToSearchFor) {
        case "gender":
            const genderSearchTool = genderSearchFunction(people);
            return currentMatchingTraits(genderSearchTool);
        case "dob":
            const dobSearchTool = dobSearchFunction(people)
            return currentMatchingTraits(dobSearchTool);
        case "height":
            const heightSearchTool = heightSearchFunction(people);
            return currentMatchingTraits(heightSearchTool);
        case "weight":
            const weightSearchTool = weightSearchFunction(people);
            return currentMatchingTraits(weightSearchTool);
        case "eyecolor":
            const eyeColorTool = eyeColorSearchFunction(people);
            return currentMatchingTraits(eyeColorTool);
        case "occupation":
            const occupSearchTool = occupationSearchFunction(people);
            return currentMatchingTraits(occupSearchTool);
    }
}

function genderSearchFunction (people) {
    const genderTraits = validatedPrompt(`Please enter the gender of the person you are searching for.`, ["male", "female"])
    const genderTraitsSearch = people.filter(person => person.gender === genderTraits);
    return currentMatchingTraits(genderTraitsSearch);
}

function dobSearchFunction (people) {
    const dobToSearch = prompt(`Please enter the person date of birth.`);
    const dobSearchOption = people.filter(person => person.dob === dobToSearch);
    return currentMatchingTraits(dobSearchOption);    
}
function heightSearchFunction (people) {
    const heightToSearch = prompt(`Please enter the person height.`);
    const heightSearchForInt = parseInt(heightToSearch)
    const heightSearchOption = people.filter(person => person.height === heightSearchForInt);
    return currentMatchingTraits(heightSearchOption)    
}
function weightSearchFunction (people) {
    const weightToSeach = prompt(`Please enter the person weight.`);
    const weightSearchForInt = parseInt(weightToSeach)
    const weightSearchOption = people.filter(person => person.weight === weightSearchForInt);
    return currentMatchingTraits(weightSearchOption)
}
function eyeColorSearchFunction (people) {
    const eyecolorToSearch = validatedPrompt(`Please enter the person eye color.`, ["brown", "black", "hazel", "blue", "green"]);
    const eyecolorSearchOption = people.filter(person => person.eyeColor === eyecolorToSearch);
    return currentMatchingTraits(eyecolorSearchOption);
}

function occupationSearchFunction (people) {
    const occupationToSearch = validatedPrompt(`Please enter the person occupation.`, ["doctor", "assistant", "politician", "nurse", "landscaper", "programmer", "architect", "student"]);
    const occupationSearchOption = people.filter(person => person.occupation === occupationToSearch);
    return currentMatchingTraits(occupationSearchOption);
}

function currentMatchingTraits(people) {
    
    const currentPeopleMatchingTraits = validatedPrompt(`Please choose a trait to search by.\n Current Number of Matching Records: ${people.length}`, [
        "gender", "dob", "height", "weight", "eyecolor", "occupation", "done"]);
    switch (currentPeopleMatchingTraits) {
        case "gender":
            const genderSearchTool = genderSearchFunction(people);
            return currentMatchingTraits(genderSearchTool);
        case "dob":
            const dobSearchTool = dobSearchFunction(people)
            return currentMatchingTraits(dobSearchTool);
        case "height":
            const heightSearchTool = heightSearchFunction(people);
            return currentMatchingTraits(heightSearchTool);
        case "weight":
            const weightSearchTool = weightSearchFunction(people);
            return currentMatchingTraits(weightSearchTool);
        case "eyecolor":
            const eyeColorTool = eyeColorSearchFunction(people);
            return currentMatchingTraits(eyeColorTool);
        case "occupation":
            const occupSearchTool = occupationSearchFunction(people);
            return currentMatchingTraits(occupSearchTool);
        case "done":
            return currentTraitSearch(people);
    }
}
function currentTraitSearch (people) {
    const currentMatchingResult = people
    if (currentMatchingResult.length > 1) {
        displayPeople('Search Results', currentMatchingResult);
    }
    else if (currentMatchingResult.length === 1) {
        const person = currentMatchingResult[0];
        mainMenu(person, people);
    }
}

function searchByName(people) {
    const firstNameToSearchFor = prompt('Please enter the the first name of the person you are searching for.');
    const lastNameToSearchFor = prompt('Please enter the the last name of the person you are searching for.');
    const fullNameSearchResults = people.filter(person => (person.firstName.toLowerCase() === firstNameToSearchFor.toLowerCase() && person.lastName.toLowerCase() === lastNameToSearchFor.toLowerCase()));
    return fullNameSearchResults;
}

function mainMenu(person, people) {

    const mainMenuUserActionChoice = validatedPrompt(
        `Person: ${person.firstName} ${person.lastName}\n\nDo you want to know their full information, family, or descendants?`,
        ['info', 'family', 'descendants', 'quit']
    );

    switch (mainMenuUserActionChoice) {
        case "info":
            displayPeople(person);
            //! TODO
            // displayPersonInfo(person);
            break;
        case "family":
            //! TODO
            // let personFamily = findPersonFamily(person, people);
            // displayPeople('Family', personFamily);
            let personFamily = findPersonFamily(person, people);
            displayPeople('Family', personFamily);
            break;
        case "descendants":
            //! TODO
            // let personDescendants = findPersonDescendants(person, people);
            // displayPeople('Descendants', personDescendants);
            let personDescendants = findPersonDescendants(person, people);
            displayPeople('Descendants', personDescendants);
            break;
        case "quit":
            return;
        default:
            alert('Invalid input. Please try again.');
    }

    return mainMenu(person, people);
}

function displayPeople(displayTitle, peopleToDisplay) {
    const formatedPeopleDisplayText = peopleToDisplay.map(person => `${person.firstName} ${person.lastName}`).join('\n');
    alert(`${displayTitle}\n\n${formatedPeopleDisplayText}`);
}

function validatedPrompt(message, acceptableAnswers) {
    acceptableAnswers = acceptableAnswers.map(aa => aa.toLowerCase());

    const builtPromptWithAcceptableAnswers = `${message} \nAcceptable Answers: ${acceptableAnswers.map(aa => `\n-> ${aa}`).join('')}`;

    const userResponse = prompt(builtPromptWithAcceptableAnswers).toLowerCase();

    if (acceptableAnswers.includes(userResponse)) {
        return userResponse;
    }
    else {
        alert(`"${userResponse}" is not an acceptable response. The acceptable responses include:\n${acceptableAnswers.map(aa => `\n-> ${aa}`).join('')} \n\nPlease try again.`);
        return validatedPrompt(message, acceptableAnswers);
    }
}

function exitOrRestart(people) {
    const userExitOrRestartChoice = validatedPrompt(
        'Would you like to exit or restart?',
        ['exit', 'restart']
    );

    switch (userExitOrRestartChoice) {
        case 'exit':
            return;
        case 'restart':
            return app(people);
        default:
            alert('Invalid input. Please try again.');
            return exitOrRestart(people);
    }

}