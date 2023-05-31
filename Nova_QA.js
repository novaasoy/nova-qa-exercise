/// <reference types="cypress" />

const QAsite = 'https://www.simplyhired.com/'

describe('QA Exercise', function () {

    const t = 2000
    const Top5 = [':nth-child(1) > [data-testid="searchSerpJob"] > .chakra-stack > [data-testid="searchSerpJobTitle"] > .chakra-button',
                ':nth-child(2) > [data-testid="searchSerpJob"] > .chakra-stack > [data-testid="searchSerpJobTitle"] > .chakra-button',
                ':nth-child(3) > [data-testid="searchSerpJob"] > .chakra-stack > [data-testid="searchSerpJobTitle"] > .chakra-button',
                ':nth-child(4) > [data-testid="searchSerpJob"] > .chakra-stack > [data-testid="searchSerpJobTitle"] > .chakra-button',
                ':nth-child(5) > [data-testid="searchSerpJob"] > .chakra-stack > [data-testid="searchSerpJobTitle"] > .chakra-button'
                ]

    beforeEach(() => {
        cy.visit (QAsite)
        //cy.contains('SimplyHired').should('exist')
        
    })

    it('In Desktop View', function () {
        cy.get('[data-testid="legalSHLogoFooterIMG"]').should('exist')

        // Filter: Containing the skills JavaScript and React
        cy.get('input[name="q"]').clear().type('JavaScript and React')

        // Filter: Specific location (New York City)
        cy.get('input[name="l"]').clear().type('New York').wait(t)
        cy.contains('New York, NY').click({force: true})

        //Search Job
        cy.contains('Search Jobs').click({force: true})
        cy.wait(t)

        //Checking if results are ready
        cy.get('.css-18noz4q').then(($btn) => {
            if ($btn.text().includes('JavaScript and React jobs in New York')) {
                cy.log('Adding desired filters... Top 5 are:')
            }
            else {
                cy.wait(t)
            }     
        })
  
        // Add Filter: Minimum Salary of $105,000
        cy.contains('Minimum Salary').click({force: true})
        cy.get('[data-testid="dropdown-list"]').then(($btn) => {
            if ($btn.text().includes('$105,000')) {
                cy.contains('$105,000').click({force: true})
            }
            else {
                cy.contains('All Salaries').click({force: true})
                cy.log('$105,000 is not available.')
            }     
        })
        cy.wait(t)
      

        // Add Filter: Job type is Full-time
        cy.contains('Job Type').click({force: true})
        cy.get('[data-testid="dropdown-list"]').then(($btn) => {
            if ($btn.text().includes('Full-time')) {
                cy.contains('Full-time').click({force: true})
            }
            else {
                cy.contains('All Job Types').click({force: true})
                cy.log('Full-time is not available.')
            }     
        })
        cy.wait(t)
        
        // Order the results by Date
        cy.get(':nth-child(2) > .chakra-radio__label').click({force: true}).then(($btn) => {
            if ($btn.text().includes('Date')) {
                cy.get(':nth-child(2) > .chakra-radio__label').click({force: true})
            }
            else {
                cy.log('Order by Date is not available.')
            }     
        })
        cy.wait(t)

        // Return the top 5 job posts
        cy.log('Top 5 job posts:')
        cy.wait(t)
        Top5.forEach(Top5 => {
            cy.get(Top5)
            .click({force: true})
            .wait(t)
            .get('[data-testid="viewJobHeadingContainer"]')
            .get('[data-testid="viewJobTitle"]').then(function($elem) {
                cy.log('Job Title: ' + $elem.text())
            })
            
        })

    })

    it('In Mobile View', function () {
        // Settings for my mobile
        cy.viewport('samsung-s10')
        cy.get('[data-testid="legalSHLogoFooterIMG"]').should('exist')

        cy.get('.css-imseer')
        cy.get('[data-testid="mobileFindJobsKeywordButtonToggle"]').click({force: true})
        

        // Filter: Containing the job title QA Engineer
        cy.get('[data-testid="findJobsKeywordInput"]').click({force: true}).clear({force: true}).wait(t).type('QA Engineer')

        // Filter: Specific location (New Jersey)
        cy.get('[data-testid="findJobsLocationInput"]').click({force: true}).clear({force: true}).wait(t).type('New Jersey')
        //cy.contains('')
        cy.contains('New Jersey').click({force: true})
        cy.get('[data-testid="findJobsSearchSubmit"]').click({force: true})
        cy.wait(t)
        cy.contains('QA Engineer jobs in New Jersey').should('exist')

        // Sort & Filter
        cy.get('[data-testid="sorting-filters-mobile-button"]').click({force: true})

        // Add Filter: Minimum Salary of $90,000
        cy.get('.css-cmqgru > :nth-child(5)').then(($btn) => {
            if ($btn.text().includes('$90,000')) {
                cy.contains('$90,000').click({force: true})
            }
            else {
                cy.contains('All Salaries').click({force: true})
                cy.log('$105,000 is not available.')
            }     
        })
        cy.wait(t)

        // Add Filter: Job type Contract
        cy.get('.css-cmqgru > :nth-child(4)').then(($btn) => {
            if ($btn.text().includes('Contract')) {
                cy.contains('Contract').click({force: true})
            }
            else {
                cy.log('Job Type has no Contract option.')
            }     
        })
        cy.wait(t)

        // Order by Relevance
        cy.get('.css-cmqgru > :nth-child(2)').then(($btn) => {
            if ($btn.text().includes('Relevance')) {
                cy.contains('Relevance').click({force: true})
            }
            else {
                cy.log('Order by Relevance is not available.')
            }     
        })
        cy.wait(t)
        
        // Return the top 5 job posts
        cy.log('Top 5 job posts:')
        Top5.forEach(Top => {
            cy.get(Top)
            .click({force: true})
            .get('[data-testid="viewJobTitle"]').then(function($elem) {
                cy.log('Job Title: ' + $elem.text())
            })
            .wait(t)
            cy.get('.css-9y2zjk').click({force: true})
            })
        })

})