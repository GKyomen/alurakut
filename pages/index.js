import React from 'react'
import nookies from "nookies"
import jwt from "jsonwebtoken"
import Box from '../src/components/Box'
import MainGrid from '../src/components/MainGrid'
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations'
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons'

function ProfileSidebar(props) {
	return (
		<Box as="aside">
			<img src={`https://github.com/${props.githubUser}.png`} style={{ borderRadius: '8px' }} />
			<hr />
			<p>
				<a className="boxLink" href={`https://github.com/${props.githubUser}`}>
					@{props.githubUser}
				</a>
			</p>
			<hr />
			<AlurakutProfileSidebarMenuDefault />
		</Box>
	)
}

function ProfileRelationsBox(props) {
	return (
		<ProfileRelationsBoxWrapper>
			<h2 className="smallTitle">
				{props.title} ({props.items.length})
			</h2>
			<ul>
				{}
			</ul>
    	</ProfileRelationsBoxWrapper>
	)
}

export default function Home(props) {
	const githubUser = props.githubUser
	const [comunidades, setComunidades] = React.useState([])
	const amigos = [
		"mateusnishimura",
		"akamarc0s",
		"boolivias",
		"Pedrohme",
		"MathVolps",
		"GuiMilani"
	]
	const [seguidores, setSeguidores] = React.useState([])

	React.useEffect(function() {
		fetch('https://api.github.com/users/GKyomen/followers')
		.then(function(serverResponse) {
			return serverResponse.json()
		})
		.then(function(completeResponse) {
			setSeguidores(completeResponse)
		})

		fetch('https://graphql.datocms.com/', {
			method: "POST",
			headers: {
				'Authorization': '7db4ea3f18336743159e46ed7620fa',
        		'Content-Type': 'application/json',
        		'Accept': 'application/json',
			},
			body: JSON.stringify({ "query": `query {
				allCommunities {
				  id 
				  title
				  imageUrl
				  creatorSlug
				}
			  }` 
			})
		})
		.then((response) => response.json())
    	.then((completeResponse) => {
			const comunidadesDoDato = completeResponse.data.allCommunities;
			setComunidades(comunidadesDoDato)
    	})
	}, [])

	return (
		<>
		<AlurakutMenu />
		<MainGrid>
			<div className="profileArea" style={{ gridArea: "profileArea" }}>
				<ProfileSidebar githubUser={githubUser} />
			</div>
			<div className="welcomeArea" style={{gridArea: "welcomeArea"}}>
				<Box>
					<h1 className="title">
						Bem-vindo(a)
					</h1>

					<OrkutNostalgicIconSet />
				</Box>
				<Box>
					<h2 className="subTitle">O que você deseja fazer?</h2>
					<form onSubmit={function handleCreateCommunity(event) {
						event.preventDefault()
						const dadosForm = new FormData(event.target)
						const novaComunidade = {
							title: dadosForm.get("title"),
							imageUrl: dadosForm.get("image"),
							creatorSlug: githubUser
						}

						fetch("/api/comunidades", {
							method: "POST",
							headers: {
								"Content-Type": "application/json"
							},
							body: JSON.stringify(novaComunidade)
						})
						.then(async (response) => {
							const dados = await response.json()
							const novaComunidade = dados.registroCriado
							const comunidadesAtualizadas = [...comunidades, novaComunidade]
							setComunidades(comunidadesAtualizadas)
						})
					}}>
						<div>
							<input 
								placeholder="Qual vai ser o nome da sua comunidade?" 
								name="title"
								aria-label="Qual vai ser o nome da sua comunidade?"
								type="text"
								/>
						</div>
						<div>
							<input 
								placeholder="Coloque uma URL para usarmos de capa" 
								name="image"
								aria-label="Coloque uma URL para usarmos de capa"
								/>
						</div>
						<button>
							Criar comunidade
						</button>
					</form>
				</Box>
			</div>
			<div className="profileRelationsArea" style={{gridArea: "profileRelationsArea"}}>
				<ProfileRelationsBox title="Seguidores" items={seguidores} />
				<ProfileRelationsBoxWrapper>
					<h2 className="smallTitle">
						Comunidades ({comunidades.length})
					</h2>
					<ul>
						{comunidades.map((itemAtual) => {
                			return (
                  				<li key={itemAtual.id}>
                    				<a href={`/communities/${itemAtual.id}`}>
                      					<img src={itemAtual.imageUrl} />
                      					<span>{itemAtual.title}</span>
                    				</a>
                  				</li>
                			)
              			})}
					</ul>
				</ProfileRelationsBoxWrapper>
				<ProfileRelationsBoxWrapper>
					<h2 className="smallTitle">
						Amigos ({amigos.length})
					</h2>

					<ul>
						{amigos.map((amigo) => {
							return (
								<li key={amigo}>
									<a href={`/users/${amigo}`}>
										<img src={`https://github.com/${amigo}.png`}/>
										<span>{amigo}</span>
									</a>
								</li>
							)
						})}
					</ul>
				</ProfileRelationsBoxWrapper>
			</div>
    	</MainGrid>
		</>
  	)
}

export async function getServerSideProps(context) {
	const cookies = nookies.get(context)
	const token = cookies.USER_TOKEN
	const { isAuthenticated } = await fetch("https://alurakut.vercel.app/api/auth", {
		headers: {
			Authorization: token
		}
	})
	.then((res) => res.json())

	if(!isAuthenticated) {
		return {
			redirect: {
				destination: "/login",
				permanent: false
			}
		}
	}

	const { githubUser } = jwt.decode(token)
	return {
		props: {
			githubUser
		}
	}
}
