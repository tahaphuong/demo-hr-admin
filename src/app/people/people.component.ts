import { Component, OnInit } from '@angular/core';
import { Person } from '../Person';
import { PersonService } from '../person-service/person.service';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit {

  people: Person[] = []

  selectedPerson?: Person
  onSelect(person: Person): void {
    this.selectedPerson = person
  }

  constructor(private personService : PersonService) { }

  getPeople(): void {
    this.personService.getPeople().subscribe(people => this.people = people);
  }

  add(surname: string, lastname: string, email: string): void {
    surname = surname.trim();
    if (!surname) { return; }
    this.personService.addPerson({ surname } as Person)
      .subscribe(p => {
        this.people.push(p);
      });
  }

  ngOnInit(): void {
    this.getPeople()
  }

}
