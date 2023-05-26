
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
            return currentMatchingTraits(genderSearchTool, people);
        case "dob":
            const dobSearchTool = dobSearchFunction(people)
            return currentMatchingTraits(dobSearchTool, people);
        case "height":
            const heightSearchTool = heightSearchFunction(people);
            return currentMatchingTraits(heightSearchTool, people);
        case "weight":
            const weightSearchTool = weightSearchFunction(people);
            return currentMatchingTraits(weightSearchTool, people);
        case "eyecolor":
            const eyeColorTool = eyeColorSearchFunction(people);
            return currentMatchingTraits(eyeColorTool, people);
        case "occupation":
            const occupSearchTool = occupationSearchFunction(people);
            return currentMatchingTraits(occupSearchTool, people);
    }
}

function genderSearchFunction (people) {
    const genderTraits = validatedPrompt(`Please enter the gender of the person you are searching for.`, ["male", "female"])
    const genderTraitsSearch = people.filter(person => person.gender === genderTraits);
    return currentMatchingTraits(genderTraitsSearch, people);
}

function dobSearchFunction (people) {
    const dobToSearch = prompt(`Please enter the person date of birth.`);
    const dobSearchOption = people.filter(person => person.dob === dobToSearch);
    return currentMatchingTraits(dobSearchOption, people);    
}
function heightSearchFunction (people) {
    const heightToSearch = prompt(`Please enter the person height.`);
    const heightSearchForInt = parseInt(heightToSearch)
    const heightSearchOption = people.filter(person => person.height === heightSearchForInt);
    return currentMatchingTraits(heightSearchOption, people)    
}
function weightSearchFunction (people) {
    const weightToSeach = prompt(`Please enter the person weight.`);
    const weightSearchForInt = parseInt(weightToSeach)
    const weightSearchOption = people.filter(person => person.weight === weightSearchForInt);
    return currentMatchingTraits(weightSearchOption, people)
}
function eyeColorSearchFunction (people) {
    const eyecolorToSearch = validatedPrompt(`Please enter the person eye color.`, ["brown", "black", "hazel", "blue", "green"]);
    const eyecolorSearchOption = people.filter(person => person.eyeColor === eyecolorToSearch);
    return currentMatchingTraits(eyecolorSearchOption, people);
}

function occupationSearchFunction (traits, people) {
    const occupationToSearch = validatedPrompt(`Please enter the person occupation.`, ["doctor", "assistant", "politician", "nurse", "landscaper", "programmer", "architect", "student"]);
    const occupationSearchOption = traits.filter(person => person.occupation === occupationToSearch);
    return currentMatchingTraits(occupationSearchOption, people);
}

function currentMatchingTraits(person, people) {
    const currentPeopleMatchingTraits = validatedPrompt(`Please choose a trait to search by.\n Current Number of Matching Records: ${person.length}`, [
        "gender", "dob", "height", "weight", "eyecolor", "occupation", "done", "exit"]);
    switch (currentPeopleMatchingTraits) {
        case "gender":
            const genderSearchTool = genderSearchFunction(person);
            return currentMatchingTraits(genderSearchTool, people);
        case "dob":
            const dobSearchTool = dobSearchFunction(person)
            return currentMatchingTraits(dobSearchTool, people);
        case "height":
            const heightSearchTool = heightSearchFunction(person);
            return currentMatchingTraits(heightSearchTool, people);
        case "weight":
            const weightSearchTool = weightSearchFunction(person);
            return currentMatchingTraits(weightSearchTool, people);
        case "eyecolor":
            const eyeColorTool = eyeColorSearchFunction(person);
            return currentMatchingTraits(eyeColorTool, people);
        case "occupation":
            const occupSearchTool = occupationSearchFunction(person, people);
            return currentMatchingTraits(occupSearchTool, people);
        case "done":
            return currentTraitSearch(person, people);
        case "exit":
            return exitOrRestart(people);
    }
}
function currentTraitSearch (person, people) {
    const currentMatchingResult = person
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

function findParentName (family, people) {
    const personParentFullName = people.filter(person => person.id === family);
    return personParentFullName
}

function displayPersonInfo (person, people) {
    
    alert("\nName: " + person.firstName + " " + person.lastName +
    "\nGender: " + person.gender + "\nDate of Birth: " + person.dob + "\nHeight: " + person.height + 
    "\nWeight: " + person.weight + "\nEye Color: " + person.eyeColor + "\nOccupation: " + person.occupation + "\nParents: " + person.parents +
    "\nCurrent Spouse: " + person.currentSpouse)
    return mainMenu(person, people)
}


function findPersonFamily(family, people) {
    let findPersonFull = family.parents.concat(family.currentSpouse);
    personFamily = [];
    if (findPersonFull.length === 0) {
        return personFamily;
    }
    for (let i = 0; i < findPersonFull.length; i++) {
        personFamily = personFamily.concat(
            findParentName(findPersonFull[i], people))
    }
    return personFamily;
}

function findPersonDescendants(person, people) {
    let findDescendants = person.id;
    personDescendants = [];
    if (findDescendants.length === 0) {
        return personDescendants
    }
    for (let i = 0; i < personDescendants.length; i++) {
        personDescendants = personDescendants.concat(
            findPersonDescendants(personDescendants[i], people))
    }
    return personDescendants

}
function mainMenu(person, people) {

    const mainMenuUserActionChoice = validatedPrompt(
        `Person: ${person.firstName} ${person.lastName}\n\nDo you want to know their full information, family, or descendants?`,
        ['info', 'family', 'descendants', 'quit']
    );

    switch (mainMenuUserActionChoice) {
        case "info":
            //! TODO
            // displayPersonInfo(person);
            displayPersonInfo(person, people);
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