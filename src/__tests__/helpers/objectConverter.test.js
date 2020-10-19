import {
    convertToObject,
    convertToMultipleObjects,
    isLastIndex,
} from "../../helpers/objectConverter";

const returnTrue = () => {
    return true;
};

test("shouldConvertArraysToObject_returnsObject", () => {
    // Arrange
    const expected = [
        {
            firstName: "Anton",
            lastName: "Öberg",
            email: "antonoberg3@outlook.com",
            github: "https://github.com/ao222qg",
            linkedIn: "https://www.linkedin.com/in/anton-%C3%B6berg-416874182/",
            education: "Linneuniversitetet",
        }[
        ([
            "Academic work",
            "It-consultant",
            "Thu Oct 03 2019 - Fri Dec 04 2020",
        ],
            ["Jetshop AB", "Software developer", "Tue Jan 07 2020 - present"])
        ],
        [
            {
                companyName: "Academic work",
                role: "It-consultant",
                timePeriod: "Thu Oct 03 2019 - Fri Dec 04 2020",
            },
            {
                companyName: "Jetshop AB",
                role: "Software developer",
                timePeriod: "Tue Jan 07 2020 - present",
            },
        ],
        [
            [
                "Academic work",
                "It-consultant",
                "Thu Oct 03 2019 - Fri Dec 04 2020",
            ],
            ["Jetshop AB", "Software developer", "Tue Jan 07 2020 - present"],
        ],
    ];

    const input = [
        '{\n' +
        '  "range": "developer!A1:Z1000",\n' +
        '  "majorDimension": "ROWS",\n' +
        '  "values": [\n' +
        '    [\n' +
        '      "firstName",\n' +
        '      "lastName",\n' +
        '      "email",\n' +
        '      "github",\n' +
        '      "linkedIn",\n' +
        '      "education"\n' +
        '    ],\n' +
        '    [\n' +
        '      "Anton",\n' +
        '      "Öberg",\n' +
        '      "antonoberg3@outlook.com",\n' +
        '      "https://github.com/ao222qg",\n' +
        '      "https://www.linkedin.com/in/anton-%C3%B6berg-416874182/",\n' +
        '      "Linneuniversitetet"\n' +
        '    ]\n' +
        '  ]\n' +
        '}',
        '{\n' +
        '  "range": "workplaces!A1:Z1000",\n' +
        '  "majorDimension": "ROWS",\n' +
        '  "values": [\n' +
        '    [\n' +
        '      "companyName",\n' +
        '      "role",\n' +
        '      "timePeriod"\n' +
        '    ],\n' +
        '    [\n' +
        '      "Academic work",\n' +
        '      "It-consultant",\n' +
        '      "Thu Oct 03 2019 - Fri Dec 04 2020"\n' +
        '    ],\n' +
        '    [\n' +
        '      "Jetshop AB",\n' +
        '      "Software developer",\n' +
        '      "Tue Jan 07 2020 - present"\n' +
        '    ]\n' +
        '  ]\n' +
        '}'
    ]
    [
        [
            'Academic work',
            'It-consultant',
            'Thu Oct 03 2019 - Fri Dec 04 2020'
        ],
        ['Jetshop AB', 'Software developer', 'Tue Jan 07 2020 - present']
    ]
    [
        '{\n' +
        '  "range": "developer!A1:Z1000",\n' +
        '  "majorDimension": "ROWS",\n' +
        '  "values": [\n' +
        '    [\n' +
        '      "firstName",\n' +
        '      "lastName",\n' +
        '      "email",\n' +
        '      "github",\n' +
        '      "linkedIn",\n' +
        '      "education"\n' +
        '    ],\n' +
        '    [\n' +
        '      "Anton",\n' +
        '      "Öberg",\n' +
        '      "antonoberg3@outlook.com",\n' +
        '      "https://github.com/ao222qg",\n' +
        '      "https://www.linkedin.com/in/anton-%C3%B6berg-416874182/",\n' +
        '      "Linneuniversitetet"\n' +
        '    ]\n' +
        '  ]\n' +
        '}',
        '{\n' +
        '  "range": "workplaces!A1:Z1000",\n' +
        '  "majorDimension": "ROWS",\n' +
        '  "values": [\n' +
        '    [\n' +
        '      "companyName",\n' +
        '      "role",\n' +
        '      "timePeriod"\n' +
        '    ],\n' +
        '    [\n' +
        '      "Academic work",\n' +
        '      "It-consultant",\n' +
        '      "Thu Oct 03 2019 - Fri Dec 04 2020"\n' +
        '    ],\n' +
        '    [\n' +
        '      "Jetshop AB",\n' +
        '      "Software developer",\n' +
        '      "Tue Jan 07 2020 - present"\n' +
        '    ]\n' +
        '  ]\n' +
        '}'
    ]
    [
        [
            'Academic work',
            'It-consultant',
            'Thu Oct 03 2019 - Fri Dec 04 2020'
        ],
        ['Jetshop AB', 'Software developer', 'Tue Jan 07 2020 - present']
    ]

    // Act
    const result = convertToObject(input);

    // Assert
    expect(result).toEqual(expected)
});

test("shouldReturnTrue_returnsTrue", () => {
    expect(true).toBe(true)
})