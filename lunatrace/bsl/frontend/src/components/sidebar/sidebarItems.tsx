/*
 * Copyright by LunaSec (owned by Refinery Labs, Inc)
 *
 * Licensed under the Business Source License v1.1
 * (the "License"); you may not use this file except in compliance with the
 * License. You may obtain a copy of the License at
 *
 * https://github.com/lunasec-io/lunasec/blob/master/licenses/BSL-LunaTrace.txt
 *
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
import { AlertOctagon, BookOpen, Briefcase, Folder, Lock, LogIn, Plus } from 'react-feather';

import { GetSidebarInfoQuery } from '../../api/generated';

import { NavSection, SidebarItem } from './types';

export function generateSidebarItems(data: GetSidebarInfoQuery | undefined, isAuthenticated: boolean): NavSection[] {
  const projectsSection: SidebarItem[] = !data
    ? []
    : [
        {
          href: '/organization/:organization_id',
          icon: Briefcase,
          title: 'Organizations',
          // badge: data.organizations.length.toString(),
          children: data.organizations.map((o) => {
            return {
              href: `/organization/${o.id as string}`,
              title: o.name,
            };
          }),
        },
        {
          href: '/project/:project_id',
          icon: Folder,
          title: 'Projects',
          // badge: data.projects.length.toString(),
          children: [
            ...data.projects.map((p) => {
              return {
                href: `/project/${p.id as string}`,
                title: p.name,
              };
            }),
            {
              href: `/project/create`,
              title: 'New Project',
              icon: Plus,
            },
          ],
        },
      ];

  const databaseSection: SidebarItem[] = [
    {
      href: '/vulnerabilities',
      icon: AlertOctagon,
      title: 'Vulnerabilities',
    },
  ];

  const accountSection: SidebarItem[] = [
    {
      href: '/',
      icon: LogIn,
      title: 'Login',
    },
  ];

  const loggedOutSections = [
    {
      title: 'Account',
      items: accountSection,
    },
    {
      title: 'Information & Databases',
      items: databaseSection,
    },
  ];

  const loggedInSections = [
    {
      title: 'Projects & Organizations',
      items: projectsSection,
    },
    {
      title: 'Information & Databases',
      items: databaseSection,
    },
  ];

  return isAuthenticated ? loggedInSections : loggedOutSections;
}
