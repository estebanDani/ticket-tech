import { Box, Container } from "@mui/material"
interface ShotimesDetailsProps {
    params: Promise<{ movieId: string }>
}


const ShotimesDetails = async ({ params }: ShotimesDetailsProps) => {
    const { movieId } = await params
    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            ShotimesDetails {movieId}
            <Box sx={{ py: 2 }}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi ut ducimus iste quaerat provident eum delectus aut magnam commodi quos, unde velit voluptas fugiat perspiciatis, sint quia. Natus, est dolores.
                Et tempora asperiores animi blanditiis atque unde doloremque neque expedita eos aliquam autem reprehenderit, nostrum sit labore sequi! Id, veritatis libero! Cupiditate ab consequatur, sed enim obcaecati voluptatibus tempore ex!
                Qui magni eius, vel nemo eos dolorum excepturi aut voluptates recusandae minima ex id nam! Quibusdam neque autem asperiores voluptate officia! Maiores iusto nobis quasi quibusdam aliquam ipsum, laboriosam voluptate?
                Aliquid, temporibus culpa fugiat at itaque eius consectetur repellat, praesentium, quasi delectus voluptatum laboriosam doloribus voluptate necessitatibus aperiam quas fuga? Possimus culpa nihil atque in recusandae placeat non asperiores nulla.
                Fuga, amet. Labore, quia excepturi. Voluptate nulla numquam maxime voluptatibus commodi magnam corrupti aut et earum quos id ea sed dolore, nam, incidunt rem tenetur! Iusto sunt error consequuntur nisi?
                Voluptatem hic voluptatum itaque aspernatur exercitationem quam, animi minus nihil asperiores totam ab praesentium sequi sapiente laborum illum reprehenderit. Voluptatibus corporis voluptatum eius consectetur dicta repellat culpa quibusdam aliquid perspiciatis.
                Unde doloribus provident molestiae officia voluptates mollitia voluptatum, animi deleniti sapiente necessitatibus id, at eligendi inventore nobis, repellendus vel odio ab! Vel sed error repellendus recusandae assumenda non repudiandae cupiditate!
                Excepturi tenetur repudiandae dicta culpa pariatur deleniti, error saepe vel cupiditate. Dolorum accusamus commodi tempora velit dolore culpa soluta voluptates, autem explicabo architecto. Voluptatem eius cum aliquam id laboriosam recusandae!
                Sed quas dolores beatae in dolorum id esse placeat architecto voluptatum. Hic iste dolorum distinctio est reiciendis voluptates incidunt quam magnam ea quo, repudiandae placeat temporibus doloribus porro quisquam ad.
                Reiciendis porro optio molestias exercitationem atque tempora facere maiores necessitatibus? Reiciendis aut nemo esse dignissimos quibusdam veritatis dolorem vitae laudantium nobis quasi accusamus pariatur totam maiores, ipsa iusto nostrum aliquid?
                Nobis alias cum nemo dolorum deleniti dicta quibusdam, sunt rerum consequuntur inventore reprehenderit cupiditate recusandae ipsam adipisci tempore consectetur? Vero hic id qui at beatae adipisci aut expedita? Quas, corporis?
                Voluptatibus earum ab expedita itaque fugiat, deserunt iste ut voluptates, exercitationem hic beatae laboriosam, sint magnam perspiciatis excepturi? Fuga saepe nam provident veritatis perspiciatis modi corporis quisquam, libero labore animi?
            </Box>
        </Container>
    )
}

export default ShotimesDetails