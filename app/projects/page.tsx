// pages/projects/index.tsx
import Link from "next/link";

const ProjectsPage = () => {
  const projects = [
    { id: "PRJ770232" },
    { id: "PRJ846046" },
    { id: "PRJ201897" },
    // Add more projects as needed
  ];

  return (
    <div>
      <h1>Projects</h1>
      <ul>
        {projects.map((project) => (
          <li key={project.id} className="flex-flex-col gap-10">
            <div >
              <Link href={`/projects/${project.id}/Dashboard`} passHref>
                Project ID : {project.id}
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectsPage;

//BTRS-TATA Projects-Mumbai
//Project Dukes
