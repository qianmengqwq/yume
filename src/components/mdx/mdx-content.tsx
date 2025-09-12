import * as runtime from 'react/jsx-runtime'

const sharedComponents = {
  // Add your global components here
}

// parse the Velite generated MDX code into a React component function
function useMDXComponent(code: string) {
  // eslint-disable-next-line no-new-func
  const fn = new Function(code)
  return fn({ ...runtime }).default
}

interface MDXProps {
  code: string
  components?: Record<string, React.ComponentType>
}

// MDXContent component
export function MDXContent({ code, components }: MDXProps) {
  const Component = useMDXComponent(code)
  return <Component className="prose lg:prose-xl" components={{ ...sharedComponents, ...components }} />
}
