import { Component, OnInit } from '@angular/core';
export interface TreeNodeInterface {
  key: string;
  name: string;
  age?: number;
  level?: number;
  expand?: boolean;
  children?: TreeNodeInterface[];
  parent?: TreeNodeInterface;
  validationDetails: string;
  validationStatus: string;
  approvalStatus: string;
  lastValidated: Date;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.less'],
})
export class TableComponent implements OnInit {
  today = new Date();

  constructor() {}
  // listOfMapData: TreeNodeInterface[]=[
  //   for(let i = 0; i< 100; i++){

  //   }
  // ]

  listOfMapData: TreeNodeInterface[] = [
    {
      key: `1`,
      name: 'Validator 1',
      validationDetails: 'validation details',
      validationStatus: 'passed',
      approvalStatus: 'approved',
      lastValidated: this.today,
      children: [
        {
          key: `1-1`,
          name: 'File1',
          validationDetails: 'validation details',
          validationStatus: 'passed',
          approvalStatus: 'approved',
          lastValidated: this.today,
        },
        {
          key: `1-2`,
          name: 'File2',
          validationDetails: 'validation details',
          validationStatus: 'passed',
          approvalStatus: 'approved',
          lastValidated: this.today,
        },
        {
          key: `1-3`,
          name: 'File3',
          validationDetails: 'validation details',
          validationStatus: 'passed',
          approvalStatus: 'approved',
          lastValidated: this.today,
        },
      ],
    },
    {
      key: `2`,
      name: 'John Brown',
      validationDetails: 'validation details',
      validationStatus: 'passed',
      approvalStatus: 'approved',
      lastValidated: this.today,
      children:[
        {
          key: `2-1`,
          name: 'File1',
          validationDetails: 'validation details',
          validationStatus: 'passed',
          approvalStatus: 'approved',
          lastValidated: this.today,
        },
        {
          key: `2-2`,
          name: 'File2',
          validationDetails: 'validation details',
          validationStatus: 'passed',
          approvalStatus: 'approved',
          lastValidated: this.today,
        },
      ]
    },
  ];
  mapOfExpandedData: { [key: string]: TreeNodeInterface[] } = {};

  collapse(
    array: TreeNodeInterface[],
    data: TreeNodeInterface,
    $event: boolean
  ): void {
    if (!$event) {
      if (data.children) {
        data.children.forEach((d) => {
          const target = array.find((a) => a.key === d.key)!;
          target.expand = false;
          this.collapse(array, target, false);
        });
      } else {
        return;
      }
    }
  }

  convertTreeToList(root: TreeNodeInterface): TreeNodeInterface[] {
    const stack: TreeNodeInterface[] = [];
    const array: TreeNodeInterface[] = [];
    const hashMap = {};
    stack.push({ ...root, level: 0, expand: false });

    while (stack.length !== 0) {
      const node = stack.pop()!;
      this.visitNode(node, hashMap, array);
      if (node.children) {
        for (let i = node.children.length - 1; i >= 0; i--) {
          stack.push({
            ...node.children[i],
            level: node.level! + 1,
            expand: false,
            parent: node,
          });
        }
      }
    }

    return array;
  }

  visitNode(
    node: TreeNodeInterface,
    hashMap: { [key: string]: boolean },
    array: TreeNodeInterface[]
  ): void {
    if (!hashMap[node.key]) {
      hashMap[node.key] = true;
      array.push(node);
    }
  }

  ngOnInit(): void {
    this.listOfMapData.forEach((item) => {
      this.mapOfExpandedData[item.key] = this.convertTreeToList(item);
    });
    // for(let i=0; i<100; i++){

    // }
  }
}
